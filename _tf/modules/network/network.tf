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
# WWW Record
# ------------------------------------------------------------------------------

resource "aws_route53_record" "www" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = "www.${var.domain}"
  type            = "A"
  allow_overwrite = var.www_record_overwrite
  alias {
    name                   = var.www_cdn.domain_name
    zone_id                = var.www_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

# ------------------------------------------------------------------------------
# Reports Record
# ------------------------------------------------------------------------------

resource "aws_route53_record" "reports" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.reportsdomain
  type    = "A"
  alias {
    name                   = var.reports_bucket.website_domain
    zone_id                = var.reports_bucket.hosted_zone_id
    evaluate_target_health = true
  }

  depends_on = [var.reports_bucket]
}

# ------------------------------------------------------------------------------
# CMS Record, Cert, and Validation
# ------------------------------------------------------------------------------

resource "aws_route53_record" "cms" {
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = var.cmsdomain
  type            = "A"
  allow_overwrite = true
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

module "uploads_dns" {
  source         = "./cdn-dns"
  aws_access_key = var.aws_access_key
  aws_secret_key = var.aws_secret_key
  domain         = var.cdndomain
  zone           = data.aws_route53_zone.main
  distribution   = var.uploads_cdn
}
