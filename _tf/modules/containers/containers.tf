resource "aws_ecr_repository" "this" {
  name = var.cmsdomain
  force_delete = false
}

resource "aws_ecs_cluster" "this" {
  name = var.dashed_cmsdomain

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_service" "this" {
  name            = "strapi"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  launch_type     = "FARGATE"
  desired_count   = var.instance_count

  load_balancer {
    target_group_arn = var.alb_target_group.arn
    container_name   = aws_ecs_task_definition.this.family
    container_port   = 1337
  }

  network_configuration {
    subnets          = [for subnet in var.subnets : subnet.id]
    assign_public_ip = true
    security_groups  = [var.service_sg.id]
  }

  depends_on = [var.alb_target_group]
}

data "aws_ecr_image" "this" {
  repository_name = var.cmsdomain
  image_tag       = "latest"
}

resource "aws_ecs_task_definition" "this" {
  family = "strapi"
  container_definitions = jsonencode([{
    name         = "strapi",
    image        = "${aws_ecr_repository.this.repository_url}@${data.aws_ecr_image.this.image_digest}",
    essential    = true,
    network_mode = "awsvpc",
    memory       = 1024,
    cpu          = 512,
    portMappings = [
      {
        containerPort = 1337,
        hostPort      = 1337
      }
    ],
    healthCheck = {
      command = [
        "CMD-SHELL",
        "wget --no-verbose --tries=1 --spider http://localhost:1337/_health || exit 1"
      ]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 30
    },
    logConfiguration = {
      logDriver = "awslogs",
      options = {
        awslogs-group         = var.dashed_cmsdomain,
        awslogs-region        = var.region,
        awslogs-stream-prefix = "streaming"
      }
    }
  }])
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 2048
  cpu                      = 1024
  execution_role_arn       = aws_iam_role.this.arn
}

resource "aws_iam_role" "this" {
  name               = "strapiTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.this.json
}

data "aws_iam_policy_document" "this" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}