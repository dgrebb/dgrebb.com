output "cf_distribution" {
  value = aws_cloudfront_distribution.static
}
output "cf_access_identity" {
  value = aws_cloudfront_origin_access_identity.origin_access_identity
}