locals {
  cmsdomain        = "stg.${var.cmsdomain}"
  cdndomain        = "stg.${var.cdndomain}"
  apidomain        = "stg.${var.apidomain}"
  dashed_cmsdomain = "stg-${var.dashed_cmsdomain}"
  dashed_cdndomain = "stg-${var.dashed_cdndomain}"
  dashed_apidomain = "stg-${var.dashed_apidomain}"
}

module "api" {
  source = "../modules/api"
  stage_name = "stage"
  environment = "staging"
  cmsdomain = local.cmsdomain
  apidomain = local.apidomain
  dashed_apidomain = local.dashed_apidomain
  api_cert = module.network.api_cert
  api_validation = module.network.api_validation
  deployed_at = var.deployed_at
}

module "state" {
  source                 = "../modules/state"
  terraform_state_bucket = var.terraform_state_bucket
}

module "network" {
  source           = "../modules/network"
  aws_access_key   = var.aws_access_key
  aws_secret_key   = var.aws_secret_key
  region           = var.region
  subnets          = var.subnets
  domain           = var.domain
  cmsdomain        = local.cmsdomain
  cdndomain        = local.cdndomain
  apidomain        = local.apidomain
  dashed_cmsdomain = local.dashed_cmsdomain
  alb              = module.scaling.alb
  cf_distribution  = module.cdn.cf_distribution
  api_gw_domain = module.api.api_gw_domain
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
  source           = "../modules/containers"
  region           = var.region
  cmsdomain        = local.cmsdomain
  dashed_cmsdomain = local.dashed_cmsdomain
  instance_count   = 1
  subnets          = module.network.subnets
  alb_target_group = module.scaling.alb_target_group
  service_sg       = module.security.service_sg
}

module "database" {
  source           = "../modules/database"
  service_sg       = module.security.service_sg
  db_subnet_group  = module.network.db_subnet_group
  dashed_cmsdomain = local.dashed_cmsdomain
  db_password      = var.db_password
}

module "management" {
  source           = "../modules/management"
  dashed_cmsdomain = local.dashed_cmsdomain
}

module "scaling" {
  source              = "../modules/scaling"
  dashed_cmsdomain    = local.dashed_cmsdomain
  vpc                 = module.network.vpc
  subnets             = module.network.subnets
  cms_cert            = module.network.cms_cert
  cms_validation = module.network.cms_validation
  lb_sg               = module.security.lb_sg
}

module "security" {
  source = "../modules/security"
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