# ------------------------------------------------------------------------------
# Application Load Balancer, Target Groups, Listeners, and Rules
# ------------------------------------------------------------------------------resource "aws_ecr_repository" "front" {

resource "aws_alb" "this" {
  name               = var.dashed_domain
  load_balancer_type = "application"
  subnets            = [for subnet in var.subnets : subnet.id]
  security_groups = [var.lb_sg.id]
}

resource "aws_lb_target_group" "front" {
  name        = var.dashed_domain
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc.id

  health_check {
    matcher = "200-499"
  }

  depends_on = [aws_alb.this]

}

resource "aws_lb_target_group" "strapi" {
  name        = var.dashed_cmsdomain
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc.id

  health_check {
    matcher = "200-499"
  }

  depends_on = [aws_alb.this]

}

resource "aws_lb_listener" "force_ssl" {
  load_balancer_arn = aws_alb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_alb.this.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.wildcard_cert.arn

  default_action {
    type = "forward"
    forward {
      target_group {
        arn = aws_lb_target_group.front.arn
      }
      target_group {
        arn = aws_lb_target_group.strapi.arn
      }
    }
  }

  depends_on = [var.wildcard_cert, var.wildcard_validation, aws_lb_target_group.front]
}

resource "aws_lb_listener_rule" "front" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.front.arn
  }

  condition {
    host_header {
      values = [var.domain]
    }
  }
}

resource "aws_lb_listener_rule" "strapi" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 2

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.strapi.arn
  }

  condition {
    host_header {
      values = [var.cmsdomain]
    }
  }
}
