# ------------------------------------------------------------------------------
# CMS Database
# ------------------------------------------------------------------------------
resource "aws_db_instance" "this" {
  depends_on                = [var.service_sg]
  identifier                = var.dashed_cmsdomain
  allocated_storage         = 10
  engine                    = "postgres"
  engine_version            = "10.23"
  instance_class            = var.instance_class
  db_name                   = "strapi"
  username                  = "strapi"
  password                  = var.db_password
  vpc_security_group_ids    = ["${var.service_sg.id}"]
  db_subnet_group_name      = var.db_subnet_group.id
  skip_final_snapshot       = var.skip_final_snapshot
  final_snapshot_identifier = var.dashed_cmsdomain
  apply_immediately         = true
  backup_retention_period   = 3
  backup_window             = "06:00-07:00"
  lifecycle {
    prevent_destroy = true
  }
}
