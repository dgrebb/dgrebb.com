output "db_sg" {
  value = aws_security_group.db
}
output "lb_sg" {
  value = aws_security_group.lb
}