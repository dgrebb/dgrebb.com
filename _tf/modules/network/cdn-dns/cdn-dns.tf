# ------------------------------------------------------------------------------
# CDN Records, Certificates, and Validation
# ------------------------------------------------------------------------------

resource "aws_route53_record" "this" {
  allow_overwrite = true
  name            = var.domain
  type            = "A"
  zone_id         = var.zone.zone_id
  alias {
    name                   = var.distribution.domain_name
    zone_id                = var.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "this" {
  # CloudFront Certs MUST be in us-east-1
  provider          = aws.acm_provider
  domain_name       = var.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.domain
  }
}

resource "aws_route53_record" "validation" {
  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = var.zone.zone_id
}

resource "aws_acm_certificate_validation" "this" {
  provider        = aws.acm_provider
  certificate_arn = aws_acm_certificate.this.arn

  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
}
