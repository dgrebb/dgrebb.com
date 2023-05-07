variable "AWS_ACCESS_KEY" {
  type      = string
  sensitive = true
}
variable "AWS_SECRET_KEY" {
  type      = string
  sensitive = true
}
variable "REGION" {
  type      = string
  sensitive = true
}
variable "DOMAIN" {
  type      = string
  sensitive = true
}
variable "DASHED_DOMAIN" {
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
  default = "cms-dgrebb-com-state"
}
