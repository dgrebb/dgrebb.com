# ------------------------------------------------------------------------------
# Wildcard CDN Certificate and Validation
# ------------------------------------------------------------------------------
resource "aws_acm_certificate" "wildcard" {
  provider          = aws.acm_provider
  domain_name       = var.domain
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${var.domain}"
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.domain
  }
}

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

resource "aws_route53_record" "wildcard_validation" {
  provider = aws.acm_provider

  for_each = {
    for dvo in aws_acm_certificate.wildcard.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
    # Skips the domain if it doesn't contain a wildcard
    if length(regexall("\\*\\..+", dvo.domain_name)) > 0
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = var.zone.zone_id
}

resource "aws_acm_certificate_validation" "wildcard" {
  provider        = aws.acm_provider
  certificate_arn = aws_acm_certificate.wildcard.arn

  validation_record_fqdns = [for record in aws_route53_record.wildcard_validation : record.fqdn]
}
