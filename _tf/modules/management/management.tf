resource "aws_cloudwatch_log_group" "this" {
  name              = var.dashed_cmsdomain
  retention_in_days = 1
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_cloudwatch_event_rule" "this" {
  name        = "container-stopped"
  description = "Notification for containers with exit code of 1 (error)."

  event_pattern = <<PATTERN
    {
      "source": [
          "aws.ecs"
      ],
      "detail-type": [
          "ECS Task State Change"
      ],
      "detail": {
          "lastStatus": [
            "STOPPED"
          ],
          "stoppedReason": [
            "Essential container in task exited"
          ],
          "containers": {
            "exitCode": [
                1
            ]
          }
      }
    }
  PATTERN
}

resource "aws_cloudwatch_event_target" "this" {
  rule      = aws_cloudwatch_event_rule.this.name
  target_id = "ContainerStopped"
  arn       = aws_cloudwatch_log_group.this.arn
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "${var.dashed_cmsdomain}_API-GW"
  retention_in_days = 1
}

resource "aws_iam_role" "cloudwatch" {
  name = "api_gateway_cloudwatch_global"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "cloudwatch" {
  name = "default"
  role = aws_iam_role.cloudwatch.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}
