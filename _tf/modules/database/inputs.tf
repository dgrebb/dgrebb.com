variable "dashed_cmsdomain" {}
variable "db_sg" {}
variable "db_subnet_group" {}
variable "instance_class" {}
variable "skip_final_snapshot" {}
variable "db_password" {
  sensitive = true
}
variable "public_access" {}
