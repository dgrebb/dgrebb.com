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
output "cms_validation" {
  value = aws_acm_certificate_validation.cms
}
output "wildcard_cert" {
  value = module.www_dns.cert
}
output "wildcard_validation" {
  value = module.www_dns.cert_validation
}
# output "www_cert" {
#   value = module.www_dns.cert
# }
output "uploads_cert" {
  value = module.uploads_dns.cert
}
output "uploads_validation" {
  value = module.uploads_dns.cert_validation
}