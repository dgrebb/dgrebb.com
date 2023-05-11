resource "aws_s3_bucket" "cms" {
  bucket = var.dashed_cmsdomain
}

resource "aws_s3_bucket" "cdn_logs" {
  bucket = "logs-${var.dashed_cdndomain}"
}

resource "aws_s3_bucket_ownership_controls" "cms" {
  bucket = aws_s3_bucket.cms.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_ownership_controls" "cdn_logs" {
  bucket = aws_s3_bucket.cdn_logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "cms" {
  bucket = aws_s3_bucket.cms.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_public_access_block" "cdn_logs" {
  bucket = aws_s3_bucket.cdn_logs.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "cms" {
  depends_on = [
    aws_s3_bucket_ownership_controls.cms,
    aws_s3_bucket_public_access_block.cms,
  ]

  bucket = aws_s3_bucket.cms.id
  acl    = "public-read"
}

resource "aws_s3_bucket_acl" "logs_s_dgrebb_com" {
  bucket = aws_s3_bucket.cdn_logs.id
  acl    = "private"
}

data "aws_iam_policy_document" "cms" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:PutObjectAcl",
    ]
    resources = [
      "${aws_s3_bucket.cms.arn}/*"
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
      aws_s3_bucket.cms.arn
    ]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.cms.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [var.cf_access_identity.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.cms.arn}"]

    principals {
      type        = "AWS"
      identifiers = [var.cf_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "cms_policy" {
  bucket = aws_s3_bucket.cms.id
  policy = data.aws_iam_policy_document.cms.json
}

resource "aws_s3_bucket_cors_configuration" "cms_s3_cors_config" {
  bucket = aws_s3_bucket.cms.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET"]
    allowed_origins = [
      "http://local.${var.cmsdomain}",
      "https://${var.cmsdomain}",
      "https://${var.cdndomain}"
    ]
    expose_headers  = []
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

# TODO: Refactor as a looped map
resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.cms.id
  key          = "index.html"
  source       = "${path.module}/defaults/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/defaults/index.html")
}

resource "aws_s3_object" "img_index_html" {
  bucket       = aws_s3_bucket.cms.id
  key          = "img/index.html"
  source       = "${path.module}/defaults/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/defaults/index.html")
}

resource "aws_s3_object" "wonka_img" {
  bucket       = aws_s3_bucket.cms.id
  key          = "tip.png"
  source       = "${path.module}/defaults/tip.png"
  content_type = "image/png"
  etag         = filemd5("${path.module}/defaults/tip.png")
}

resource "aws_s3_object" "notfound_html" {
  bucket       = aws_s3_bucket.cms.id
  key          = "404.html"
  source       = "${path.module}/defaults/404.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/defaults/404.html")
}

resource "aws_s3_object" "notfound_img" {
  bucket       = aws_s3_bucket.cms.id
  key          = "404.gif"
  source       = "${path.module}/defaults/404.gif"
  content_type = "image/gif"
  etag         = filemd5("${path.module}/defaults/404.gif")
}

