resource "aws_alb" "this" {
  name               = var.dashed_cmsdomain
  load_balancer_type = "application"
  subnets            = [for subnet in var.subnets : subnet.id]
  # security group
  security_groups = [var.lb_sg.id]
}

resource "aws_lb_target_group" "this" {
  name        = var.dashed_cmsdomain
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc.id

  health_check {
    matcher = "200-499"
  }
}

resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_alb.this.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.cms_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }

  depends_on = [var.cms_cert, var.cms_cert_validation]
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