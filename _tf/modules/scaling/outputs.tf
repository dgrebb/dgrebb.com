output "alb" {
  value = aws_alb.this
}
output "strapi_alb_tg" {
  value = aws_lb_target_group.strapi
}
output "front_alb_tg" {
  value = aws_lb_target_group.front
}