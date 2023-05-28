output "cw_role" {
  value = aws_iam_role.cloudwatch
}

output "cw_policy" {
  value = aws_iam_role_policy.cloudwatch
}