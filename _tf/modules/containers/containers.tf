# ------------------------------------------------------------------------------
# Elastic Container Registry Repos
# ------------------------------------------------------------------------------

resource "aws_ecr_repository" "strapi" {
  name = var.cmsdomain
  force_delete = var.force_delete
}

# ------------------------------------------------------------------------------
# ECR Image References
# ------------------------------------------------------------------------------

data "aws_ecr_image" "strapi" {
  repository_name = var.cmsdomain
  image_tag       = "latest"
}

resource "aws_ecs_cluster" "this" {
  name = var.dashed_cmsdomain

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# ------------------------------------------------------------------------------
# CMS Service and Definition
# ------------------------------------------------------------------------------

resource "aws_ecs_service" "strapi" {
  name            = "strapi"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.strapi.arn
  launch_type     = "FARGATE"
  desired_count   = var.strapi_instance_count

  load_balancer {
    target_group_arn = var.strapi_alb_tg.arn
    container_name   = aws_ecs_task_definition.strapi.family
    container_port   = 1337
  }

  network_configuration {
    subnets          = [for subnet in var.subnets : subnet.id]
    assign_public_ip = true
    security_groups  = [var.service_sg.id]
  }

  depends_on = [var.strapi_alb_tg]
}

resource "aws_ecs_task_definition" "strapi" {
  family = "strapi"
  container_definitions = jsonencode([{
    name         = "strapi",
    image        = "${aws_ecr_repository.strapi.repository_url}@${data.aws_ecr_image.strapi.image_digest}",
    essential    = true,
    network_mode = "awsvpc",
    memory       = 512,
    cpu          = 256,
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
        awslogs-stream-prefix = "ecs"
      }
    }
  }])
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.this.arn
}

resource "aws_iam_role" "this" {
  name               = "dgrebbTaskExecutionRole"
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

# ------------------------------------------------------------------------------
# IAM Roles and Policies
# ------------------------------------------------------------------------------

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}