# ------------------------------------------------------------------------------
# Defaults for Snoopers
# ------------------------------------------------------------------------------

# TODO: Refactor as a looped map
resource "aws_s3_object" "index_html" {
  bucket       = var.bucket.id
  key          = "index.html"
  source       = "${path.module}/files/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/files/index.html")
}

resource "aws_s3_object" "img_index_html" {
  bucket       = var.bucket.id
  key          = "img/index.html"
  source       = "${path.module}/files/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/files/index.html")
}

resource "aws_s3_object" "wonka" {
  bucket       = var.bucket.id
  key          = "tip.png"
  source       = "${path.module}/files/tip.png"
  content_type = "image/png"
  etag         = filemd5("${path.module}/files/tip.png")
}

resource "aws_s3_object" "notfound_html" {
  bucket       = var.bucket.id
  key          = "404/index.html"
  source       = "${path.module}/files/404/index.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/files/404/index.html")
}

resource "aws_s3_object" "notfound_img" {
  bucket       = var.bucket.id
  key          = "404.gif"
  source       = "${path.module}/files/404.gif"
  content_type = "image/gif"
  etag         = filemd5("${path.module}/files/404.gif")
}

resource "aws_s3_object" "robots_txt_cdn" {
  bucket       = var.bucket.id
  key          = "robots.txt"
  source       = "${path.module}/../../reports/robots.txt"
  content_type = "text/plain"
  etag         = filemd5("${path.module}/../../reports/robots.txt")
}

