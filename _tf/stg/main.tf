# ------------------------------------------------------------------------------
# Staging Infrastructure
# ------------------------------------------------------------------------------

locals {
  domain           = "stg.${var.domain}"
  cmsdomain        = "stg.${var.cmsdomain}"
  cdndomain        = "stg.${var.cdndomain}"
  dashed_domain    = "stg-${var.dashed_domain}"
  dashed_cmsdomain = "stg-${var.dashed_cmsdomain}"
  dashed_cdndomain = "stg-${var.dashed_cdndomain}"
}

module "cdn" {
  source           = "../modules/cdn"
  cdndomain        = local.cdndomain
  dashed_cmsdomain = local.dashed_cmsdomain
  cms_bucket       = module.storage.cms_bucket
  cdn_log_bucket   = module.storage.cdn_log_bucket
  cdn_cert         = module.network.cdn_cert
}

module "containers" {
  source                = "../modules/containers"
  force_delete          = true
  region                = var.region
  domain                = local.domain
  dashed_domain         = local.dashed_domain
  cmsdomain             = local.cmsdomain
  dashed_cmsdomain      = local.dashed_cmsdomain
  strapi_instance_count = 1
  front_instance_count  = 1
  subnets               = module.network.subnets
  strapi_alb_tg         = module.scaling.strapi_alb_tg
  front_alb_tg          = module.scaling.front_alb_tg
  service_sg            = module.security.service_sg
}

module "database" {
  source              = "../modules/database"
  service_sg          = module.security.service_sg
  db_subnet_group     = module.network.db_subnet_group
  dashed_cmsdomain    = local.dashed_cmsdomain
  db_password         = var.db_password
  instance_class      = "db.t2.micro"
  skip_final_snapshot = true
}

module "management" {
  source        = "../modules/management"
  dashed_domain = local.dashed_domain
}

module "network" {
  source           = "../modules/network"
  aws_access_key   = var.aws_access_key
  aws_secret_key   = var.aws_secret_key
  region           = var.region
  subnets          = var.subnets
  basedomain       = var.basedomain
  domain           = local.domain
  cmsdomain        = local.cmsdomain
  cdndomain        = local.cdndomain
  dashed_domain    = local.dashed_domain
  dashed_cmsdomain = local.dashed_cmsdomain
  alb              = module.scaling.alb
  cf_distribution  = module.cdn.cf_distribution
}

module "scaling" {
  source              = "../modules/scaling"
  domain              = local.domain
  dashed_domain       = local.dashed_domain
  cmsdomain           = local.cmsdomain
  dashed_cmsdomain    = local.dashed_cmsdomain
  vpc                 = module.network.vpc
  subnets             = module.network.subnets
  wildcard_cert       = module.network.wildcard_cert
  wildcard_validation = module.network.wildcard_validation
  lb_sg               = module.security.lb_sg
}

module "security" {
  source = "../modules/security"
}

module "state" {
  source                 = "../modules/state"
  terraform_state_bucket = var.terraform_state_bucket
}

module "storage" {
  source             = "../modules/storage"
  cmsdomain          = local.cmsdomain
  cdndomain          = local.cdndomain
  dashed_cmsdomain   = local.dashed_cmsdomain
  dashed_cdndomain   = local.dashed_cdndomain
  force_destroy      = true
  cf_access_identity = module.cdn.cf_access_identity
}
