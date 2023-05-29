# ------------------------------------------------------------------------------
# Network and Subnets
# ------------------------------------------------------------------------------

# Main hosted zone
data "aws_route53_zone" "main" {
  name         = "${var.basedomain}."
  private_zone = false
}

# Reference to default VPC
resource "aws_default_vpc" "default" {
}

# Default subnets
resource "aws_default_subnet" "this" {
  # loop through subnets defined in vars.tf
  for_each          = var.subnets
  availability_zone = "${var.region}${each.value}"
}

# Database subnets
resource "aws_db_subnet_group" "this" {
  name        = var.dashed_domain
  description = "${var.domain} subnets"
  subnet_ids  = [for subnet in aws_default_subnet.this : subnet.id]
}

# ------------------------------------------------------------------------------
# Frontend Record
# ------------------------------------------------------------------------------

resource "aws_route53_record" "apex" {
  allow_overwrite = true
  name            = var.domain
  type            = "A"
  zone_id         = data.aws_route53_zone.main.zone_id
  alias {
    name                   = var.alb.dns_name
    zone_id                = var.alb.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  allow_overwrite = true
  name            = "www.${var.domain}"
  type            = "A"
  zone_id         = data.aws_route53_zone.main.zone_id
  alias {
    name                   = var.alb.dns_name
    zone_id                = var.alb.zone_id
    evaluate_target_health = false
  }
}

# ------------------------------------------------------------------------------
# CMS Record
# ------------------------------------------------------------------------------

resource "aws_route53_record" "cms" {
  allow_overwrite = true
  name            = var.cmsdomain
  type            = "A"
  zone_id         = data.aws_route53_zone.main.zone_id
  alias {
    name                   = var.alb.dns_name
    zone_id                = var.alb.zone_id
    evaluate_target_health = false
  }
}

# ------------------------------------------------------------------------------
# Wildcard Certificate and Validation
# ------------------------------------------------------------------------------
resource "aws_acm_certificate" "wildcard" {
  domain_name       = var.basedomain
  validation_method = "DNS"

  subject_alternative_names = [
    "*.dgrebb.com",
    "*.cms.dgrebb.com"
  ]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.basedomain
  }
}

resource "aws_route53_record" "wildcard_validation" {

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
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "wildcard" {
  certificate_arn = aws_acm_certificate.wildcard.arn

  validation_record_fqdns = [for record in aws_route53_record.wildcard_validation : record.fqdn]
}

# ------------------------------------------------------------------------------
# CDN Record, Certificate, and Validation
# ------------------------------------------------------------------------------

resource "aws_route53_record" "cdn" {
  allow_overwrite = true
  name            = var.cdndomain
  type            = "A"
  zone_id         = data.aws_route53_zone.main.zone_id
  alias {
    name                   = var.cf_distribution.domain_name
    zone_id                = var.cf_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "cdn" {
  # CloudFront Certs MUST be in us-east-1
  provider          = aws.acm_provider
  domain_name       = var.cdndomain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.cdndomain
  }
}

resource "aws_route53_record" "cdn_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cdn.domain_validation_options : dvo.domain_name => {
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
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "cdn" {
  provider        = aws.acm_provider
  certificate_arn = aws_acm_certificate.cdn.arn

  validation_record_fqdns = [for record in aws_route53_record.cdn_validation : record.fqdn]
}
