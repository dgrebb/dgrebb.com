resource "aws_db_instance" "this" {
  depends_on             = [var.service_sg]
  identifier             = var.dashed_cmsdomain
  allocated_storage      = 10
  engine                 = "postgres"
  engine_version         = "10.23"
  instance_class         = "db.t2.small"
  db_name                = "strapi"
  username               = "strapi"
  password               = var.db_password
  vpc_security_group_ids = ["${var.service_sg.id}"]
  db_subnet_group_name   = var.db_subnet_group.id
  skip_final_snapshot    = "true"
  lifecycle {
    prevent_destroy = false
  }
}