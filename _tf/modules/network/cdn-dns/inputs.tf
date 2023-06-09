variable "domain" {}
variable "zone" {}
variable "distribution" {}
variable "aws_access_key" {
  sensitive = true
}
variable "aws_secret_key" {
  sensitive = true
}
