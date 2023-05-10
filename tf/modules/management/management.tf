resource "aws_cloudwatch_log_group" "log_group" {
  name              = var.dashed_cmsdomain
  retention_in_days = 1
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_cloudwatch_event_rule" "container_stopped_rule" {
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

resource "aws_cloudwatch_event_target" "container-stopped-rule-result" {
  rule      = aws_cloudwatch_event_rule.container_stopped_rule.name
  target_id = "ContainerStopped"
  arn       = aws_cloudwatch_log_group.log_group.arn
}