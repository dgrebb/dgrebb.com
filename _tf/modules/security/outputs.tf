output "service_sg" {
  value = aws_security_group.svc
}
output "lb_sg" {
  value = aws_security_group.lb
}