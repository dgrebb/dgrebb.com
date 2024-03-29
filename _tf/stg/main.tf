# Staging Infrastructure
# ------------------------------------------------------------------------------

locals {
  domain               = "stg.${var.domain}"
  reportsdomain        = "stg.reports.${var.domain}"
  cmsdomain            = "stg.${var.cmsdomain}"
  cdndomain            = "stg.${var.cdndomain}"
  dashed_domain        = "stg-${var.dashed_domain}"
  dashed_reportsdomain = "stg-reports-${var.dashed_domain}"
  dashed_cmsdomain     = "stg-${var.dashed_cmsdomain}"
  dashed_cdndomain     = "stg-${var.dashed_cdndomain}"
}

module "www_cdn" {
  source        = "../modules/cdn"
  domain        = local.domain
  dashed_domain = local.dashed_domain
  bucket        = module.www_cdn_bucket.bucket
  log_enabled   = true
  log_bucket    = module.www_cdn_bucket.log_bucket
  cert          = module.network.wildcard_cert
  redirect      = false
  www           = true
  cdndomain     = local.cdndomain
}

module "uploads_cdn" {
  source        = "../modules/cdn"
  domain        = local.cdndomain
  dashed_domain = local.dashed_cdndomain
  bucket        = module.uploads_cdn_bucket.bucket
  log_enabled   = true
  log_bucket    = module.uploads_cdn_bucket.log_bucket
  cert          = module.network.uploads_cert
  redirect      = false
  www           = false
  cdndomain     = local.cdndomain
}

module "containers" {
  source                = "../modules/containers"
  force_delete          = true
  region                = var.region
  cmsdomain             = local.cmsdomain
  dashed_cmsdomain      = local.dashed_cmsdomain
  strapi_instance_count = 1
  subnets               = module.network.subnets
  strapi_alb_tg         = module.scaling.strapi_alb_tg
  db_sg                 = module.security.db_sg
}

module "database" {
  source              = "../modules/database"
  db_sg               = module.security.db_sg
  db_subnet_group     = module.network.db_subnet_group
  dashed_cmsdomain    = local.dashed_cmsdomain
  db_password         = var.db_password
  instance_class      = "db.t3.micro"
  skip_final_snapshot = true
  # Public access needs "DUAL" mode to be disabled in database module first.
  public_access = false
}

module "management" {
  source           = "../modules/management"
  dashed_cmsdomain = local.dashed_cmsdomain
}

module "network" {
  source               = "../modules/network"
  aws_secret_key       = var.aws_secret_key
  aws_access_key       = var.aws_access_key
  region               = var.region
  subnets              = var.subnets
  basedomain           = var.basedomain
  domain               = local.domain
  cmsdomain            = local.cmsdomain
  cdndomain            = local.cdndomain
  reportsdomain        = local.reportsdomain
  dashed_domain        = local.dashed_domain
  alb                  = module.scaling.alb
  www_cdn              = module.www_cdn.cf_distribution
  uploads_cdn          = module.uploads_cdn.cf_distribution
  reports_cdn          = module.reports_cdn.cf_distribution
  www_record_overwrite = true
  redirect             = false
}

module "scaling" {
  source           = "../modules/scaling"
  domain           = local.domain
  dashed_domain    = local.dashed_domain
  cmsdomain        = local.cmsdomain
  dashed_cmsdomain = local.dashed_cmsdomain
  vpc              = module.network.vpc
  subnets          = module.network.subnets
  cms_cert         = module.network.cms_cert
  cms_validation   = module.network.cms_validation
  lb_sg            = module.security.lb_sg
}

module "security" {
  source           = "../modules/security"
  dashed_cmsdomain = local.dashed_cmsdomain
  pub              = false
}

module "state" {
  source                 = "../modules/state"
  terraform_state_bucket = var.terraform_state_bucket
}

module "www_cdn_bucket" {
  source             = "../modules/storage"
  basedomain         = var.basedomain
  domain             = local.domain
  dashed_domain      = local.dashed_domain
  force_destroy      = true
  cf_access_identity = module.www_cdn.cf_access_identity
}

module "uploads_cdn_bucket" {
  source             = "../modules/storage"
  basedomain         = var.basedomain
  domain             = local.cdndomain
  dashed_domain      = local.dashed_cdndomain
  force_destroy      = true
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
  redirect      = false
  www           = false
  cdndomain     = local.cdndomain
}

module "reports_bucket" {
  source               = "../modules/reports"
  reportsdomain        = local.reportsdomain
  dashed_reportsdomain = local.dashed_reportsdomain
  cf_access_identity   = module.reports_cdn.cf_access_identity
}
