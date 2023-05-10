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
variable "dashed_domain" {
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
  type = string
  default = "cms-dgrebb-com-state"
}
