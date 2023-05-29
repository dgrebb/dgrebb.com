# ------------------------------------------------------------------------------
# Production Infrastructure
# ------------------------------------------------------------------------------resource "aws_ecr_repository" "front" {

module "cdn" {
  source           = "../modules/cdn"
  cdndomain        = var.cdndomain
  dashed_cmsdomain = var.dashed_cmsdomain
  cms_bucket       = module.storage.cms_bucket
  cdn_log_bucket   = module.storage.cdn_log_bucket
  cdn_cert         = module.network.cdn_cert
}

module "containers" {
  source                = "../modules/containers"
  force_delete          = true
  region                = var.region
  domain                = var.domain
  dashed_domain         = var.dashed_domain
  cmsdomain             = var.cmsdomain
  dashed_cmsdomain      = var.dashed_cmsdomain
  strapi_instance_count = 1
  front_instance_count  = 2
  subnets               = module.network.subnets
  strapi_alb_tg         = module.scaling.strapi_alb_tg
  front_alb_tg          = module.scaling.front_alb_tg
  service_sg            = module.security.service_sg
}

module "database" {
  source           = "../modules/database"
  service_sg       = module.security.service_sg
  db_subnet_group  = module.network.db_subnet_group
  dashed_cmsdomain = var.dashed_cmsdomain
  db_password      = var.db_password
}

module "management" {
  source        = "../modules/management"
  dashed_domain = var.dashed_domain
}

module "network" {
  source           = "../modules/network"
  aws_access_key   = var.aws_access_key
  aws_secret_key   = var.aws_secret_key
  region           = var.region
  subnets          = var.subnets
  basedomain       = var.basedomain
  domain           = var.domain
  cmsdomain        = var.cmsdomain
  cdndomain        = var.cdndomain
  dashed_domain    = var.dashed_domain
  dashed_cmsdomain = var.dashed_cmsdomain
  alb              = module.scaling.alb
  cf_distribution  = module.cdn.cf_distribution
}

module "scaling" {
  source              = "../modules/scaling"
  domain              = var.domain
  dashed_domain       = var.dashed_domain
  cmsdomain           = var.cmsdomain
  dashed_cmsdomain    = var.dashed_cmsdomain
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
  cmsdomain          = var.cmsdomain
  cdndomain          = var.cdndomain
  dashed_cmsdomain   = var.dashed_cmsdomain
  dashed_cdndomain   = var.dashed_cdndomain
  force_destroy      = true
  cf_access_identity = module.cdn.cf_access_identity
}
