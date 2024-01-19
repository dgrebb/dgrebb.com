# ------------------------------------------------------------------------------
# CMS Database
# ------------------------------------------------------------------------------
resource "aws_db_instance" "this" {
  depends_on                = [var.db_sg]
  identifier                = var.dashed_cmsdomain
  allocated_storage         = 5
  engine                    = "postgres"
  engine_version            = "15.3"
  instance_class            = var.instance_class
  multi_az                  = false
  db_name                   = "strapi"
  username                  = "strapi"
  password                  = var.db_password
  storage_encrypted         = false
  vpc_security_group_ids    = ["${var.db_sg.id}"]
  db_subnet_group_name      = var.db_subnet_group.id
  skip_final_snapshot       = var.skip_final_snapshot
  final_snapshot_identifier = var.dashed_cmsdomain
  apply_immediately         = true
  backup_retention_period   = 3
  backup_window             = "06:00-07:00"
  # Disable DUAL mode for public access
  publicly_accessible = var.public_access
  # TODO: Set up IPv6
  # network_type        = "DUAL"

  parameter_group_name = aws_db_parameter_group.this.name
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_db_parameter_group" "this" {
  name   = "strapi-db-parameter-group"
  family = "postgres15"

  parameter {
    name  = "rds.force_ssl"
    value = "0"
  }
}
