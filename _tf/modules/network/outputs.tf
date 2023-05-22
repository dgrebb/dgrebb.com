output "vpc" {
  value = aws_default_vpc.default
}
output "subnets" {
  value = aws_default_subnet.this
}
output "db_subnet_group" {
  value = aws_db_subnet_group.this
}
output "cms_cert" {
  value = aws_acm_certificate.cms
}
output "cdn_cert" {
  value = aws_acm_certificate.cdn
}
output "api_cert" {
  value = aws_acm_certificate.api
}
output "cms_validation" {
  value = aws_acm_certificate_validation.cms
}
output "api_validation" {
  value = aws_acm_certificate_validation.api
}