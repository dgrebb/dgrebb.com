output "vpc" {
  value = aws_default_vpc.default
}
output "subnets" {
  value = aws_default_subnet.default
}
output "cms_cert" {
    value = aws_acm_certificate.cms_cert
}
output "cdn_cert" {
    value = aws_acm_certificate.cdn_cert
}
output "cms_cert_validation" {
  value = aws_acm_certificate_validation.cms_cert_validation
}
output "db_subnet_group" {
  value = aws_db_subnet_group.db
}