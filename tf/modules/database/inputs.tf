variable "dashed_cmsdomain" {}
variable "service_sg" {}
variable "db_subnet_group" {}
variable "db_password" {
  sensitive = true
}