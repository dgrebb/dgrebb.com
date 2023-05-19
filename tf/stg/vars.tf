variable "aws_access_key" {
  type      = string
  sensitive = true
}
variable "aws_secret_key" {
  type      = string
  sensitive = true
}
variable "region" {
  type      = string
  sensitive = true
}
variable "domain" {
  type      = string
  sensitive = true
}
variable "cmsdomain" {
  type      = string
  sensitive = true
}
variable "cdndomain" {
  type      = string
  sensitive = true
}
variable "apidomain" {
  type      = string
  sensitive = true
}
variable "dashed_domain" {
  type      = string
  sensitive = true
}
variable "dashed_cmsdomain" {
  type      = string
  sensitive = true
}
variable "dashed_cdndomain" {
  type      = string
  sensitive = true
}
variable "dashed_apidomain" {
  type      = string
  sensitive = true
}
variable "subnets" {
  type = set(string)
  default = [
    "a",
    "b"
  ]
}
variable "terraform_state_bucket" {
  type    = string
  default = "stg-cms-dgrebb-com-state"
}
variable "db_password" {
  type      = string
  sensitive = true
}
variable "deployed_at" {}