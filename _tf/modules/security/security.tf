# ------------------------------------------------------------------------------
# Security Groups
# ------------------------------------------------------------------------------

data "external" "ip" {
  program = ["/bin/bash" , "${path.module}/../../_scripts/ip.sh"]
}

resource "aws_security_group" "svc" {
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    security_groups = ["${aws_security_group.lb.id}"]
  }

  ingress {
    self      = true
    from_port = 5432
    to_port   = 5432
    protocol  = "tcp"
  }


  dynamic "ingress" {
    for_each = var.pub == true ? [1] : []
    content {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      cidr_blocks = [format("%s/%s", data.external.ip.result["internet_ip"], 32)]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "lb" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
