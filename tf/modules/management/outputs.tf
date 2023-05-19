output "cw_role" {
  value = aws_iam_role.cloudwatch
}

output "cw_policy" {
  value = aws_iam_role_policy.cloudwatch
}

output "api_log_group" {
  value = aws_cloudwatch_log_group.api
}