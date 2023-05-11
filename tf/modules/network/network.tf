# Main hosted zone
data "aws_route53_zone" "main" {
  name         = "${var.domain}."
  private_zone = false
}

# Reference to default VPC
resource "aws_default_vpc" "default" {
}

# Default subnets
resource "aws_default_subnet" "default" {
  # loop through subnets defined in vars.tf
  for_each          = var.subnets
  availability_zone = "${var.region}${each.value}"
}

# Database subnets
resource "aws_db_subnet_group" "db" {
  name        = var.dashed_cmsdomain
  description = "${var.cmsdomain} subnets"
  subnet_ids  = [for subnet in aws_default_subnet.default : subnet.id]
}

# ------------------------------------------------------------------------------
# CMS Record and Certificate
# ------------------------------------------------------------------------------

resource "aws_route53_record" "cms_record" {
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

resource "aws_acm_certificate" "cms_cert" {
  domain_name       = var.cmsdomain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.cmsdomain
  }
}

resource "aws_acm_certificate_validation" "cms_cert_validation" {
  certificate_arn = aws_acm_certificate.cms_cert.arn

  validation_record_fqdns = [for record in aws_route53_record.cms_validation_record : record.fqdn]
}

resource "aws_route53_record" "cms_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.cms_cert.domain_validation_options : dvo.domain_name => {
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

# ------------------------------------------------------------------------------
# CDN Record and Certificate
# ------------------------------------------------------------------------------

resource "aws_route53_record" "cdn_record" {
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

resource "aws_acm_certificate" "cdn_cert" {
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

resource "aws_acm_certificate_validation" "cdn_cert_validation" {
  provider        = aws.acm_provider
  certificate_arn = aws_acm_certificate.cdn_cert.arn

  validation_record_fqdns = [for record in aws_route53_record.cdn_validation_record : record.fqdn]
}

resource "aws_route53_record" "cdn_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.cdn_cert.domain_validation_options : dvo.domain_name => {
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