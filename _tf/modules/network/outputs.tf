output "vpc" {
  value = aws_default_vpc.default
}
output "subnets" {
  value = aws_default_subnet.this
}
output "db_subnet_group" {
  value = aws_db_subnet_group.this
}
output "wildcard_cert" {
  value = aws_acm_certificate.wildcard
}
output "wildcard_validation" {
  value = aws_acm_certificate_validation.wildcard
}
output "cdn_cert" {
  value = aws_acm_certificate.cdn
}
# output "api_cert" {
#   value = aws_acm_certificate.api
# }
# output "api_validation" {
#   value = aws_acm_certificate_validation.api
# }