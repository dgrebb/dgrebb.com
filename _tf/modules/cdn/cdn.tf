# ------------------------------------------------------------------------------
# CDNs
# ------------------------------------------------------------------------------

locals {
  s3origin = "${var.domain}s3origin"
}

resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "Terraform CloudFront recreation workaround"
  # https://github.com/hashicorp/terraform/issues/7930#issuecomment-530903082
}

resource "aws_cloudfront_function" "subdir" {
  name    = "subdir-index-${var.dashed_domain}"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect subdirectory root to index.html"
  publish = true
  code    = file("${path.module}/ref/subdir-index.js")
}

resource "aws_cloudfront_function" "redirect" {
  count   = var.redirect ? 1 : 0
  name    = "naked-redirect-${var.dashed_domain}"
  runtime = "cloudfront-js-2.0"
  comment = "Redirect naked domain to www"
  publish = true
  code    = file("${path.module}/ref/naked-redirect.js")
}


resource "aws_cloudfront_distribution" "this" {
  comment             = var.domain
  price_class         = "PriceClass_100"
  aliases             = [var.domain, "www.${var.domain}"]
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  tags = {
    "domain" = "dgrebb.com"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404/index.html"
  }

  origin {
    domain_name = var.bucket.bucket_regional_domain_name
    origin_id   = local.s3origin

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  dynamic "logging_config" {
    for_each = var.log_enabled ? [1] : []
    content {
      include_cookies = false
      bucket          = var.log_bucket.bucket_domain_name
      prefix          = ""
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3origin

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

      headers = [
        "Origin",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
      ]
    }

    # Replaced by naked-redirect below, when redirect is true
    dynamic "function_association" {
      for_each = var.redirect ? [] : [1]
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.subdir.arn
      }
    }

    # Test this on STG by first setting redirect = true on `www_cdn` in main.tf
    dynamic "function_association" {
      for_each = var.redirect ? [1] : []
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.redirect[0].arn
      }
    }

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    # Apply/Remove Headers
    response_headers_policy_id = var.www ? aws_cloudfront_response_headers_policy.this.id : null
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }
}

# Security Headers Policy and Server Removal
resource "aws_cloudfront_response_headers_policy" "this" {
  name = "${var.dashed_domain}-security-headers-policy"

  custom_headers_config {
    items {
      override = true
      header   = "permissions-policy"
      value    = "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
    }
    items {
      override = true
      header   = "feature-policy"
      value    = "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
    }
    items {
      override = true
      header   = "server"
      value    = "_"
    }
  }

  security_headers_config {
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "same-origin"
      override        = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    strict_transport_security {
      access_control_max_age_sec = "63072000"
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    content_security_policy {
      content_security_policy = "img-src 'self' https://${var.cdndomain}; frame-ancestors 'self'; frame-src 'self'; media-src 'self' https://*.${var.domain} data:; object-src 'self'; worker-src 'self';"
      override                = true
    }
  }
}
