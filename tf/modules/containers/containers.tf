resource "aws_ecr_repository" "cms" {
  name = var.cmsdomain
}

resource "aws_ecs_cluster" "cms" {
  name = var.dashed_cmsdomain
}

resource "aws_ecs_service" "strapi_service" {
  name            = "strapi-service"
  cluster         = aws_ecs_cluster.cms.id
  task_definition = aws_ecs_task_definition.strapi.arn
  launch_type     = "FARGATE"
  desired_count   = var.instance_count

  load_balancer {
    target_group_arn = var.alb_target_group.arn
    container_name   = aws_ecs_task_definition.strapi.family
    container_port   = 1337
  }

  network_configuration {
    subnets          = [for subnet in var.subnets : subnet.id]
    assign_public_ip = true
    security_groups  = [var.service_sg.id]
  }

  depends_on = [var.alb_target_group]
}

data "aws_ecr_image" "webdav_image" {
  repository_name = var.cmsdomain
  image_tag       = "latest"
}

resource "aws_ecs_task_definition" "strapi" {
  family = "strapi"
  container_definitions = jsonencode([{
    name         = "strapi",
    image        = "${aws_ecr_repository.cms.repository_url}@${data.aws_ecr_image.webdav_image.image_digest}",
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
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}