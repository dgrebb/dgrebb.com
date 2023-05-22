output "cms_bucket" {
  value = aws_s3_bucket.cms
}
output "cdn_log_bucket" {
  value = aws_s3_bucket.cdn_logs
}