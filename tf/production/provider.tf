provider "aws" {
  region     = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  default_tags {
    owner = "cms@dgrebb.com"
    property = "${var.dashed_subdomain}"
    env = "production"
    cost_center = "self"
  }
}

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  backend "s3" {}
}
