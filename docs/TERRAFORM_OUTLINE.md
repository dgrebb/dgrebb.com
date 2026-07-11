# Terraform Infrastructure Outline

> ⚠️ **IMPORTANT**: This document is for **planning purposes only**. Do not apply any Terraform changes without proper state synchronization. Modifying Terraform without syncing state risks corrupting the infrastructure.

## Current Infrastructure Overview

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────────┐
│                         AWS Infrastructure                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │ CloudFront  │    │ CloudFront  │    │ CloudFront  │             │
│  │ (www)       │    │ (uploads)   │    │ (reports)   │             │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘             │
│         │                  │                  │                     │
│         ▼                  ▼                  ▼                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │ S3 Bucket   │    │ S3 Bucket   │    │ S3 Bucket   │             │
│  │ (static)    │    │ (media)     │    │ (reports)   │             │
│  └─────────────┘    └─────────────┘    └─────────────┘             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         VPC                                  │   │
│  │  ┌─────────────┐                                            │   │
│  │  │     ALB     │ ◄── HTTPS (443)                            │   │
│  │  └──────┬──────┘                                            │   │
│  │         │                                                    │   │
│  │         ▼                                                    │   │
│  │  ┌─────────────┐    ┌─────────────┐                         │   │
│  │  │ ECS Fargate │───►│ RDS         │                         │   │
│  │  │ (Strapi)    │    │ PostgreSQL  │                         │   │
│  │  │ 256 CPU     │    │ db.t3.micro │                         │   │
│  │  │ 512 MB      │    │ postgres15  │                         │   │
│  │  └─────────────┘    └─────────────┘                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Modules Inventory

| Module | Purpose | Files |
|--------|---------|-------|
| `cdn` | CloudFront distributions | cdn.tf, inputs.tf, outputs.tf |
| `containers` | ECR + ECS Fargate | containers.tf, inputs.tf |
| `database` | RDS PostgreSQL | database.tf, inputs.tf |
| `management` | IAM policies | management.tf, inputs.tf |
| `network` | VPC, subnets, DNS | network.tf, cdn-dns/, inputs.tf, outputs.tf |
| `reports` | Reports S3 bucket | reports.tf, inputs.tf, outputs.tf |
| `scaling` | ALB + target groups | scaling.tf, inputs.tf, outputs.tf |
| `security` | Security groups | security.tf, inputs.tf, outputs.tf |
| `state` | Terraform state bucket | state.tf, inputs.tf |
| `storage` | S3 buckets | storage.tf, defaults/, inputs.tf, outputs.tf |

### Environments

- **Production** (`_tf/prd/`): Full infrastructure
- **Staging** (`_tf/stg/`): Mirrors production

---

## Required Updates (DO NOT APPLY)

### 1. Database Version Update

**Current State:**
```hcl
# _tf/modules/database/database.tf
engine_version = "15.5"
family = "postgres15"
```

**Recommended Update:**
```hcl
engine_version = "16.4"  # Latest PostgreSQL 16
family = "postgres16"
```

**Notes:**
- PostgreSQL 15.5 is outdated (released 2023)
- PostgreSQL 16 is current stable with better performance
- Requires RDS instance restart for major version upgrade

---

### 2. Cost Reduction: Remove ALB + ECS + RDS

**Current Monthly Costs (Estimated):**
| Service | Cost |
|---------|------|
| RDS db.t3.micro | $15-25 |
| ECS Fargate (256 CPU/512 MB) | $10-20 |
| ALB | $16-25 |
| CloudFront + S3 | $5-15 |
| **Total** | **$46-85** |

**Proposed Architecture (SSG-Only):**
```
┌─────────────────────────────────────────────────────────────────────┐
│                    Minimal AWS Infrastructure                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │ CloudFront  │    │ CloudFront  │    │ CloudFront  │             │
│  │ (www)       │    │ (uploads)   │    │ (reports)   │             │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘             │
│         │                  │                  │                     │
│         ▼                  ▼                  ▼                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │ S3 Bucket   │    │ S3 Bucket   │    │ S3 Bucket   │             │
│  │ (static)    │    │ (media)     │    │ (reports)   │             │
│  └─────────────┘    └─────────────┘    └─────────────┘             │
│                                                                     │
│  [NO VPC, NO ALB, NO ECS, NO RDS]                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Estimated Monthly Cost: $5-15**

**Modules to Remove (in order):**
1. `scaling` - ALB, target groups, listeners
2. `containers` - ECS cluster, task definitions, ECR
3. `database` - RDS instance, parameter groups
4. Parts of `network` - VPC components (keep DNS)
5. Parts of `security` - Security groups

**Modules to Keep:**
- `cdn` - CloudFront distributions
- `storage` - S3 buckets
- `reports` - Reports bucket
- `state` - Terraform state
- Parts of `network` - Route53 DNS records

---

### 3. Module Dependencies

Before removing any module, understand dependencies:

```
cdn ◄─── network (certificates, DNS)
     └── storage (buckets)

containers ◄── scaling (ALB target group)
           ├── network (subnets)
           └── security (security groups)

database ◄── network (subnet group)
         └── security (DB security group)

scaling ◄── network (VPC, subnets)
        └── security (LB security group)
```

**Safe Removal Order:**
1. Remove `containers` module
2. Remove `database` module  
3. Remove `scaling` module
4. Remove unused `security` resources
5. Remove unused `network` resources (keep DNS)

---

## Migration Plan (Read-Only)

### Phase 1: Content Export
1. Export all Strapi content to JSON
2. Commit content to repository
3. Update SvelteKit to read from static JSON

### Phase 2: Infrastructure Teardown
1. Backup RDS database
2. Remove ECS service (scale to 0)
3. Remove ALB
4. Remove RDS instance
5. Clean up VPC if unused

### Phase 3: Terraform State Update
1. `terraform state rm` for removed resources
2. Update `main.tf` to remove modules
3. Verify remaining infrastructure

---

## Current Resource Specifications

### Database (RDS)
```hcl
instance_class = "db.t3.micro"
engine = "postgres"
engine_version = "15.5"
allocated_storage = 5
multi_az = false
backup_retention_period = 3
```

### Container (ECS Fargate)
```hcl
cpu = 256
memory = 512
desired_count = 1
launch_type = "FARGATE"
```

### Load Balancer (ALB)
```hcl
load_balancer_type = "application"
ssl_policy = "ELBSecurityPolicy-2016-08"
```

---

## Warnings

1. **DO NOT** run `terraform apply` without syncing state
2. **DO NOT** modify resources that may affect production traffic
3. **ALWAYS** backup RDS before any changes
4. **ALWAYS** test in staging first

---

## Related Issues

- #1338 - Terraform Infrastructure Outline

---

## Contact

For infrastructure changes, coordinate with the repository owner to ensure Terraform state is properly synchronized.
