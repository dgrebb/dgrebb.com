output "api_gw_domain" {
    value = aws_api_gateway_domain_name.this
    sensitive = true
}