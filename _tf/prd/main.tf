# Production Infrastructure
# ------------------------------------------------------------------------------

module "www_cdn" {
  source        = "../modules/cdn"
  domain        = var.domain
  dashed_domain = var.dashed_domain
  bucket        = module.www_cdn_bucket.bucket
  log_bucket    = module.www_cdn_bucket.log_bucket
  cert          = module.network.wildcard_cert
}

module "uploads_cdn" {
  source        = "../modules/cdn"
  domain        = var.cdndomain
  dashed_domain = var.dashed_cdndomain
  bucket        = module.uploads_cdn_bucket.bucket
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
  service_sg            = module.security.service_sg
}

module "database" {
  source              = "../modules/database"
  service_sg          = module.security.service_sg
  db_subnet_group     = module.network.db_subnet_group
  dashed_cmsdomain    = var.dashed_cmsdomain
  db_password         = var.db_password
  instance_class      = "db.t3.micro"
  skip_final_snapshot = true
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
  dashed_domain        = var.dashed_domain
  dashed_cmsdomain     = var.dashed_cmsdomain
  alb                  = module.scaling.alb
  www_cdn              = module.www_cdn.cf_distribution
  uploads_cdn          = module.uploads_cdn.cf_distribution
  www_record_overwrite = false
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
  source = "../modules/security"
}

module "state" {
  source                 = "../modules/state"
  terraform_state_bucket = var.terraform_state_bucket
}

module "www_cdn_bucket" {
  source             = "../modules/storage"
  domain             = var.domain
  dashed_domain      = var.dashed_domain
  force_destroy      = true
  cf_access_identity = module.www_cdn.cf_access_identity
}

module "uploads_cdn_bucket" {
  source             = "../modules/storage"
  domain             = var.cdndomain
  dashed_domain      = local.dashed_cdndomain
  force_destroy      = true
  cf_access_identity = module.uploads_cdn.cf_access_identity
}

module "uploads_bucket_defaults" {
  source = "../modules/storage/defaults"
  bucket = module.uploads_cdn_bucket.bucket
}
