output "bucket" {
  value = aws_s3_bucket.assets
}
output "log_bucket" {
  value = aws_s3_bucket.logs
}