# Production Infrastructure
# ------------------------------------------------------------------------------

locals {
  reportsdomain        = "reports.${var.domain}"
  dashed_reportsdomain = "reports-${var.dashed_domain}"
}

module "www_cdn" {
  source        = "../modules/cdn"
  domain        = var.domain
  dashed_domain = var.dashed_domain
  bucket        = module.www_cdn_bucket.bucket
  log_enabled   = true
  log_bucket    = module.www_cdn_bucket.log_bucket
  cert          = module.network.wildcard_cert
}

module "uploads_cdn" {
  source        = "../modules/cdn"
  domain        = var.cdndomain
  dashed_domain = var.dashed_cdndomain
  bucket        = module.uploads_cdn_bucket.bucket
  log_enabled   = true
  log_bucket    = module.uploads_cdn_bucket.log_bucket
  cert          = module.network.uploads_cert
}

module "containers" {
  source                = "../modules/containers"
  force_delete          = true
  region                = var.region
  cmsdomain             = var.cmsdomain
  dashed_cmsdomain      = var.dashed_cmsdomain
  strapi_instance_count = 1
  subnets               = module.network.subnets
  strapi_alb_tg         = module.scaling.strapi_alb_tg
  db_sg                 = module.security.db_sg
}

module "database" {
  source              = "../modules/database"
  db_sg               = module.security.db_sg
  db_subnet_group     = module.network.db_subnet_group
  dashed_cmsdomain    = var.dashed_cmsdomain
  db_password         = var.db_password
  instance_class      = "db.t3.micro"
  skip_final_snapshot = true
  public_access       = false
}

module "management" {
  source           = "../modules/management"
  dashed_cmsdomain = var.dashed_cmsdomain
}

module "network" {
  source               = "../modules/network"
  aws_secret_key       = var.aws_secret_key
  aws_access_key       = var.aws_access_key
  region               = var.region
  subnets              = var.subnets
  basedomain           = var.basedomain
  domain               = var.domain
  cmsdomain            = var.cmsdomain
  cdndomain            = var.cdndomain
  reportsdomain        = local.reportsdomain
  dashed_domain        = var.dashed_domain
  alb                  = module.scaling.alb
  www_cdn              = module.www_cdn.cf_distribution
  uploads_cdn          = module.uploads_cdn.cf_distribution
  reports_cdn          = module.reports_cdn.cf_distribution
  www_record_overwrite = true
}

module "scaling" {
  source           = "../modules/scaling"
  domain           = var.domain
  dashed_domain    = var.dashed_domain
  cmsdomain        = var.cmsdomain
  dashed_cmsdomain = var.dashed_cmsdomain
  vpc              = module.network.vpc
  subnets          = module.network.subnets
  cms_cert         = module.network.cms_cert
  cms_validation   = module.network.cms_validation
  lb_sg            = module.security.lb_sg
}

module "security" {
  source           = "../modules/security"
  dashed_cmsdomain = var.dashed_cmsdomain
  pub              = false
}

module "state" {
  source                 = "../modules/state"
  terraform_state_bucket = var.terraform_state_bucket
}

module "www_cdn_bucket" {
  source             = "../modules/storage"
  basedomain         = var.basedomain
  domain             = var.domain
  dashed_domain      = var.dashed_domain
  force_destroy      = false
  cf_access_identity = module.www_cdn.cf_access_identity
}

module "uploads_cdn_bucket" {
  source             = "../modules/storage"
  basedomain         = var.basedomain
  domain             = var.cdndomain
  dashed_domain      = var.dashed_cdndomain
  force_destroy      = false
  cf_access_identity = module.uploads_cdn.cf_access_identity
}

module "uploads_bucket_defaults" {
  source = "../modules/storage/defaults"
  bucket = module.uploads_cdn_bucket.bucket
}

module "reports_cdn" {
  source        = "../modules/cdn"
  domain        = local.reportsdomain
  dashed_domain = local.dashed_reportsdomain
  bucket        = module.reports_bucket.reports_bucket
  log_enabled   = false
  log_bucket    = false
  cert          = module.network.reports_cert
}

module "reports_bucket" {
  source               = "../modules/reports"
  reportsdomain        = local.reportsdomain
  dashed_reportsdomain = local.dashed_reportsdomain
  cf_access_identity   = module.reports_cdn.cf_access_identity
}
