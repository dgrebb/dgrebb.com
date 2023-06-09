# ------------------------------------------------------------------------------
# Buckets and Access
# ------------------------------------------------------------------------------

resource "aws_s3_bucket" "assets" {
  bucket = var.dashed_domain
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket" "logs" {
  bucket = "${var.dashed_domain}-cdn-logs"
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_ownership_controls" "assets" {
  bucket = aws_s3_bucket.assets.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket = aws_s3_bucket.logs.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_acl" "assets" {
  depends_on = [
    aws_s3_bucket_ownership_controls.assets,
    aws_s3_bucket_public_access_block.assets,
  ]

  bucket = aws_s3_bucket.assets.id
  acl    = "public-read"
}

resource "aws_s3_bucket_acl" "logs" {
  bucket = aws_s3_bucket.logs.id
  acl    = "private"
}

# ------------------------------------------------------------------------------
# IAM Roles and Policies
# ------------------------------------------------------------------------------

data "aws_iam_policy_document" "assets" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:PutObjectAcl",
    ]
    resources = [
      "${aws_s3_bucket.assets.arn}/*"
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    actions = [
      "s3:ListBucket"
    ]
    resources = [
      aws_s3_bucket.assets.arn
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.assets.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [var.cf_access_identity.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.assets.arn}"]

    principals {
      type        = "AWS"
      identifiers = [var.cf_access_identity.iam_arn]
    }
  }
}

# ------------------------------------------------------------------------------
# Bucket Policies and CORS Config
# ------------------------------------------------------------------------------

resource "aws_s3_bucket_policy" "assets" {
  bucket = aws_s3_bucket.assets.id
  policy = data.aws_iam_policy_document.assets.json
}

resource "aws_s3_bucket_cors_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = [
      "http://local.${var.domain}",
      "https://${var.domain}"
    ]
    expose_headers  = []
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

# ------------------------------------------------------------------------------
# Defaults for Snoopers
# ------------------------------------------------------------------------------

# TODO: Refactor as a looped map
resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.assets.id
  key          = "index.html"
  source       = "${path.module}/defaults/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/defaults/index.html")
}

resource "aws_s3_object" "img_index_html" {
  bucket       = aws_s3_bucket.assets.id
  key          = "img/index.html"
  source       = "${path.module}/defaults/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/defaults/index.html")
}

resource "aws_s3_object" "wonka" {
  bucket       = aws_s3_bucket.assets.id
  key          = "tip.png"
  source       = "${path.module}/defaults/tip.png"
  content_type = "image/png"
  etag         = filemd5("${path.module}/defaults/tip.png")
}

resource "aws_s3_object" "notfound_html" {
  bucket       = aws_s3_bucket.assets.id
  key          = "404.html"
  source       = "${path.module}/defaults/404.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/defaults/404.html")
}

resource "aws_s3_object" "notfound_img" {
  bucket       = aws_s3_bucket.assets.id
  key          = "404.gif"
  source       = "${path.module}/defaults/404.gif"
  content_type = "image/gif"
  etag         = filemd5("${path.module}/defaults/404.gif")
}

