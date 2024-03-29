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
  assign_generated_ipv6_cidr_block = true
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
  # TODO: Set up IPv6
  # supported_network_types = ["DUAL"]
  subnet_ids = [for subnet in aws_default_subnet.this : subnet.id]
}

# ------------------------------------------------------------------------------
# WWW Record
# ------------------------------------------------------------------------------

# IPV4
resource "aws_route53_record" "www_a" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = "www.${var.domain}"
  type            = "A"
  allow_overwrite = var.www_record_overwrite

  alias {
    name                   = var.www_cdn.domain_name
    zone_id                = var.www_cdn.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [var.www_cdn]
}

# IPV6
resource "aws_route53_record" "www_aaaa" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = "www.${var.domain}"
  type            = "AAAA"
  allow_overwrite = var.www_record_overwrite

  alias {
    name                   = var.www_cdn.domain_name
    zone_id                = var.www_cdn.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [var.www_cdn]
}

# ------------------------------------------------------------------------------
# Reports Record, Cert, and Validation
# ------------------------------------------------------------------------------

resource "aws_route53_record" "reports" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.reportsdomain
  type    = "A"
  alias {
    name                   = var.reports_cdn.domain_name
    zone_id                = var.reports_cdn.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [var.reports_cdn]
}

resource "aws_acm_certificate" "reports" {
  domain_name       = var.reportsdomain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = var.reportsdomain
  }
}

resource "aws_route53_record" "reports_validation" {
  for_each = {
    for dvo in aws_acm_certificate.reports.domain_validation_options : dvo.domain_name => {
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

resource "aws_acm_certificate_validation" "reports" {
  certificate_arn = aws_acm_certificate.reports.arn

  validation_record_fqdns = [for record in aws_route53_record.reports_validation : record.fqdn]
}

# ------------------------------------------------------------------------------
# CMS Record, Cert, and Validation
# ------------------------------------------------------------------------------

resource "aws_route53_record" "cms_a" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = var.cmsdomain
  type            = "A"
  allow_overwrite = true
  alias {
    name                   = var.alb.dns_name
    zone_id                = var.alb.zone_id
    evaluate_target_health = false
  }

  depends_on = [var.alb]
}

resource "aws_route53_record" "cms_aaaa" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = var.cmsdomain
  type            = "A"
  allow_overwrite = true
  alias {
    name                   = var.alb.dns_name
    zone_id                = var.alb.zone_id
    evaluate_target_health = false
  }

  depends_on = [var.alb]
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

resource "aws_route53_record" "validation" {
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

  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
}

# ------------------------------------------------------------------------------
# CDN Records, Certs, and Validations
# ------------------------------------------------------------------------------

module "www_dns" {
  source         = "./cdn-dns"
  aws_access_key = var.aws_access_key
  aws_secret_key = var.aws_secret_key
  domain         = var.domain
  zone           = data.aws_route53_zone.main
  distribution   = var.www_cdn
}

module "reports_dns" {
  source         = "./cdn-dns"
  aws_access_key = var.aws_access_key
  aws_secret_key = var.aws_secret_key
  domain         = var.reportsdomain
  zone           = data.aws_route53_zone.main
  distribution   = var.reports_cdn
}

module "uploads_dns" {
  source         = "./cdn-dns"
  aws_access_key = var.aws_access_key
  aws_secret_key = var.aws_secret_key
  domain         = var.cdndomain
  zone           = data.aws_route53_zone.main
  distribution   = var.uploads_cdn
}
