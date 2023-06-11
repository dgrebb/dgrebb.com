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
  runtime = "cloudfront-js-1.0"
  comment = "Redirect subdirectory root to index.html"
  publish = true
  code    = file("${path.module}/ref/subdir-index.js")
}

resource "aws_cloudfront_distribution" "this" {
  comment             = var.domain
  price_class         = "PriceClass_100"
  aliases             = [var.domain, "www.${var.domain}"]
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404.html"
  }

  origin {
    domain_name = var.bucket.bucket_regional_domain_name
    origin_id   = local.s3origin

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  logging_config {
    include_cookies = false
    bucket          = var.log_bucket.bucket_domain_name
    prefix          = ""
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
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.subdir.arn
    }

    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}
