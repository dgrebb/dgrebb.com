# SSG Migration Plan

## Goal

Stand up a fully static site at a new subdomain (`beta.dgrebb.com`), prove it works, then cut over `www` and apex.

## Target Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Final Architecture                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   GitHub Actions                                        │
│   ┌─────────────────────────────────────────────────┐  │
│   │ 1. Checkout repo                                │  │
│   │ 2. Start Strapi + SQLite (local container)     │  │
│   │ 3. Seed content from repo                      │  │
│   │ 4. Build SvelteKit (fetches from localhost)    │  │
│   │ 5. Upload build/ to S3                         │  │
│   │ 6. Invalidate CloudFront cache                 │  │
│   └─────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│   ┌─────────────────────────────────────────────────┐  │
│   │              S3 Bucket                          │  │
│   │  /index.html                                    │  │
│   │  /post/my-article/index.html                   │  │
│   │  /_app/immutable/...                           │  │
│   │  /uploads/image.jpg  ◄── assets baked in       │  │
│   └─────────────────────────────────────────────────┘  │
│                          │                              │
│                          ▼                              │
│   ┌─────────────────────────────────────────────────┐  │
│   │           CloudFront Distribution               │  │
│   │  - HTTPS termination                           │  │
│   │  - Edge caching                                │  │
│   │  - Security headers                            │  │
│   │  - Custom domain (www.dgrebb.com)              │  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
│   DELETED: ECS, ALB, RDS, VPC                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Key Decisions

### Same S3 bucket for assets and SSG?

**Yes, recommended.** 

During build:
1. Strapi exports content + copies uploads to `static/uploads/`
2. SvelteKit builds with assets already in place
3. Everything uploads to single S3 bucket

Benefits:
- Simpler deployment (one sync)
- No CORS issues
- No separate CDN for uploads
- Atomic deploys (content + assets together)

### Do we still need CloudFront?

**Yes, but only one distribution.**

S3 website hosting doesn't support:
- HTTPS on custom domains
- Security headers
- Edge caching

CloudFront provides all of these. We keep one distribution, delete the uploads CDN.

### What about the current uploads CDN bucket?

Keep it temporarily for backward compatibility during migration. Old posts may reference `cdn.dgrebb.com/uploads/...`. Options:
1. Rewrite URLs during build to use relative paths
2. Keep uploads CDN pointing to same bucket (or redirect)
3. After full migration, update all URLs and delete

---

## Phase 1: Content Export Setup

### 1.1 Export Strapi Content

```bash
# In back/ directory
npx strapi export --no-encrypt -f content-export
```

This creates `content-export.tar.gz` with:
- All content types as JSON
- Media files

### 1.2 Create Content Repository Structure

```
/content/
  /data/
    posts.json
    categories.json
    cv-experiences.json
    ...
  /uploads/
    image1.jpg
    image2.png
    ...
```

### 1.3 Update SvelteKit Data Fetching

Create adapter to read from local JSON instead of API:

```javascript
// src/lib/api/content.js
import posts from '$content/data/posts.json';

export function getPosts() {
  return posts;
}

// OR keep API calls but point to localhost during build
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:1337'
  : 'http://localhost:1337'; // Same - Strapi runs during build
```

---

## Phase 2: Local Build Pipeline

### 2.1 Docker Compose for Build

```yaml
# docker-compose.build.yml
services:
  strapi:
    build: ./back
    environment:
      DATABASE_CLIENT: sqlite
      DATABASE_FILENAME: .tmp/data.db
    volumes:
      - ./content/data:/app/.tmp/data
      - ./content/uploads:/app/public/uploads
    ports:
      - "1337:1337"
```

### 2.2 Build Script

```bash
#!/bin/bash
# scripts/build-ssg.sh

# Start Strapi with SQLite
docker compose -f docker-compose.build.yml up -d strapi

# Wait for Strapi to be ready
until curl -s http://localhost:1337/_health > /dev/null; do
  sleep 2
done

# Build SvelteKit
cd front && pnpm build

# Copy uploads to build output
cp -r ../content/uploads ./build/uploads/

# Stop Strapi
docker compose -f docker-compose.build.yml down
```

### 2.3 Test Locally

```bash
./scripts/build-ssg.sh
cd front && pnpm preview
# Visit http://localhost:4173
```

---

## Phase 3: Beta Infrastructure (Terraform)

### 3.1 Create Beta S3 Bucket

```hcl
# _tf/beta/main.tf
resource "aws_s3_bucket" "beta" {
  bucket = "beta.dgrebb.com"
}

resource "aws_s3_bucket_website_configuration" "beta" {
  bucket = aws_s3_bucket.beta.id
  
  index_document { suffix = "index.html" }
  error_document { key = "404/index.html" }
}

resource "aws_s3_bucket_public_access_block" "beta" {
  bucket = aws_s3_bucket.beta.id
  
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

### 3.2 Create Beta CloudFront Distribution

```hcl
resource "aws_cloudfront_distribution" "beta" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = ["beta.dgrebb.com"]
  price_class         = "PriceClass_100"
  
  origin {
    domain_name = aws_s3_bucket.beta.bucket_regional_domain_name
    origin_id   = "S3-beta"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.beta.cloudfront_access_identity_path
    }
  }
  
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-beta"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    
    # Use managed cache policy
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
  }
  
  # Custom 404 handling
  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404/index.html"
  }
  
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.beta.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  
  restrictions {
    geo_restriction { restriction_type = "none" }
  }
}
```

### 3.3 DNS Record

```hcl
resource "aws_route53_record" "beta" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "beta.dgrebb.com"
  type    = "A"
  
  alias {
    name                   = aws_cloudfront_distribution.beta.domain_name
    zone_id                = aws_cloudfront_distribution.beta.hosted_zone_id
    evaluate_target_health = false
  }
}
```

---

## Phase 4: GitHub Actions CI/CD

### 4.1 Deploy Workflow

```yaml
# .github/workflows/deploy-ssg.yml
name: Deploy SSG

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    
    services:
      strapi:
        image: ghcr.io/${{ github.repository }}/strapi:latest
        ports:
          - 1337:1337
        env:
          DATABASE_CLIENT: sqlite
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 11
      
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      
      - name: Wait for Strapi
        run: |
          until curl -s http://localhost:1337/_health; do
            sleep 2
          done
      
      - name: Install & Build
        working-directory: front
        run: |
          pnpm install --frozen-lockfile
          pnpm build
      
      - name: Sync to S3
        run: |
          aws s3 sync front/build s3://beta.dgrebb.com \
            --delete \
            --cache-control "max-age=31536000,immutable" \
            --exclude "*.html" \
            --exclude "sitemap.xml"
          
          # HTML files with shorter cache
          aws s3 sync front/build s3://beta.dgrebb.com \
            --cache-control "max-age=3600" \
            --include "*.html" \
            --include "sitemap.xml"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
```

---

## Phase 5: Validation & Cutover

### 5.1 Validate Beta Site

- [ ] All pages render correctly
- [ ] Images load from `/uploads/`
- [ ] Navigation works
- [ ] 404 page works
- [ ] HTTPS works
- [ ] Security headers present
- [ ] Performance acceptable (Lighthouse)

### 5.2 Update URL References

Search and replace in content:
- `cdn.dgrebb.com/uploads/` → `/uploads/`
- `stg.cdn.dgrebb.com/uploads/` → `/uploads/`

### 5.3 Cutover Steps

1. Update CloudFront aliases: `beta.dgrebb.com` → `www.dgrebb.com`, `dgrebb.com`
2. Update Route53 records for www and apex
3. Invalidate CloudFront cache
4. Test production URLs
5. Monitor for errors

### 5.4 Teardown Old Infrastructure

After successful cutover and monitoring period:

```bash
# Order matters - dependencies first
terraform destroy -target=module.containers
terraform destroy -target=module.database
terraform destroy -target=module.scaling
terraform destroy -target=module.uploads_cdn
terraform destroy -target=module.uploads_cdn_bucket
# Keep: www_cdn, www_cdn_bucket, network (DNS), state
```

---

## Cost Comparison

| Item | Current | After Migration |
|------|---------|-----------------|
| RDS db.t3.micro | ~$15-25/mo | $0 |
| ECS Fargate | ~$10-20/mo | $0 |
| ALB | ~$16-25/mo | $0 |
| CloudFront (2 distributions) | ~$5-10/mo | ~$2-5/mo (1 dist) |
| S3 (3 buckets) | ~$1-3/mo | ~$0.50-1/mo (1 bucket) |
| **Total** | **~$47-83/mo** | **~$3-6/mo** |

**Savings: ~$40-80/month ($500-950/year)**

---

## Timeline

| Phase | Description | Effort |
|-------|-------------|--------|
| 1 | Content export & repo structure | 2-4 hours |
| 2 | Local build pipeline | 2-4 hours |
| 3 | Beta infrastructure (TF) | 1-2 hours |
| 4 | GitHub Actions workflow | 1-2 hours |
| 5 | Validation & cutover | 1-2 hours |
| **Total** | | **7-14 hours** |

---

## Open Questions

1. **Content editing workflow**: How do we edit content after migration?
   - Option A: Edit JSON/Markdown files directly in repo
   - Option B: Run Strapi locally, export, commit
   - Option C: Move to git-based CMS (Keystatic, TinaCMS)

2. **Image optimization**: Should we process images during build?
   - Could use sharp/imagetools to generate responsive sizes
   - Or keep as-is for simplicity

3. **Preview deploys**: Do we want preview URLs for PRs?
   - Could deploy to `pr-123.beta.dgrebb.com`
   - Requires additional CloudFront/S3 setup
