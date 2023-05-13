# Main hosted zone
data "aws_route53_zone" "main" {
  name         = "${var.domain}."
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
  name        = var.dashed_cmsdomain
  description = "${var.cmsdomain} subnets"
  subnet_ids  = [for subnet in aws_default_subnet.this : subnet.id]
}

# ------------------------------------------------------------------------------
# CMS Record and Certificate
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

resource "aws_acm_certificate" "cms" {
  domain_name       = var.cmsdomain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.cmsdomain
  }
}

resource "aws_route53_record" "cms_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cms.domain_validation_options : dvo.domain_name => {
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

resource "aws_acm_certificate_validation" "cms" {
  certificate_arn = aws_acm_certificate.cms.arn

  validation_record_fqdns = [for record in aws_route53_record.cms_validation : record.fqdn]
}

# ------------------------------------------------------------------------------
# CDN Record and Certificate
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