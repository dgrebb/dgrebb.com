provider "aws" {
  region     = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  default_tags {
    tags = {
      Owner = "cms@dgrebb.com"
      Property = "stg-${var.dashed_cmsdomain}"
      Environment = "staging"
      Cost_Center = "self"
    }
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
