# ------------------------------------------------------------------------------
# Buckets and Access
# ------------------------------------------------------------------------------

resource "aws_s3_bucket" "reports" {
  bucket        = var.dashed_reportsdomain
  force_destroy = true
}

resource "aws_s3_bucket_acl" "reports" {
  bucket     = aws_s3_bucket.reports.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_public_access_block.reports]
}

resource "aws_s3_bucket_website_configuration" "reports" {
  bucket = aws_s3_bucket.reports.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404/index.html"
  }

}

resource "aws_s3_bucket_ownership_controls" "reports" {
  bucket = aws_s3_bucket.reports.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "reports" {
  bucket = aws_s3_bucket.reports.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

# ------------------------------------------------------------------------------
# IAM Roles and Policies
# ------------------------------------------------------------------------------

data "aws_iam_policy_document" "reports" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:PutObjectAcl",
    ]
    resources = [
      "${aws_s3_bucket.reports.arn}/*"
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.reports.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [var.cf_access_identity.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.reports.arn}"]

    principals {
      type        = "AWS"
      identifiers = [var.cf_access_identity.iam_arn]
    }
  }
}

# ------------------------------------------------------------------------------
# Bucket Policies and CORS Config
# ------------------------------------------------------------------------------

resource "aws_s3_bucket_policy" "reports" {
  bucket = aws_s3_bucket.reports.id
  policy = data.aws_iam_policy_document.reports.json
}

resource "aws_s3_bucket_cors_configuration" "reports" {
  bucket = aws_s3_bucket.reports.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["https://${var.reportsdomain}"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

# ------------------------------------------------------------------------------
# Bucket Default Files
# ------------------------------------------------------------------------------

resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.reports.id
  key          = "index.html"
  source       = "${path.module}/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/index.html")
}

resource "aws_s3_object" "robots_txt" {
  bucket       = aws_s3_bucket.reports.id
  key          = "robots.txt"
  source       = "${path.module}/robots.txt"
  content_type = "text/plain"
  etag         = filemd5("${path.module}/robots.txt")
}

resource "aws_s3_object" "error_html" {
  bucket       = aws_s3_bucket.reports.id
  key          = "404/index.html"
  source       = "${path.module}/404/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/404/index.html")
}

resource "aws_s3_object" "backhouse" {
  bucket       = aws_s3_bucket.reports.id
  key          = "img/backhouse.jpg"
  source       = "${path.module}/img/backhouse.jpg"
  content_type = "image/jpeg"
  etag         = filemd5("${path.module}/img/backhouse.jpg")
}

resource "aws_s3_object" "favicon" {
  bucket       = aws_s3_bucket.reports.id
  key          = "favicon.ico"
  source       = "${path.module}/img/favicon.ico"
  content_type = "image/x-icon"
  etag         = filemd5("${path.module}/img/favicon.ico")
}
