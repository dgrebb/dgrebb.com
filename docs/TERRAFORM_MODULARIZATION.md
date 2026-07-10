# Terraform Modularization Roadmap

> **Purpose**: Identify hardcoded values and patterns to refactor for a more maintainable, DRY Terraform configuration.

## Current Issues Identified

### 1. Hardcoded Values in Modules

#### Database Module (`modules/database/database.tf`)
```hcl
# Hardcoded values that should be variables:
engine_version = "15.5"           # Should be var.engine_version
family = "postgres15"             # Should be derived or var.pg_family
allocated_storage = 5             # Should be var.allocated_storage
db_name = "strapi"                # Should be var.db_name
username = "strapi"               # Should be var.db_username
backup_retention_period = 3       # Should be var.backup_retention_period
backup_window = "06:00-07:00"     # Should be var.backup_window
ca_cert_identifier = "rds-ca-rsa2048-g1"  # Should be var.ca_cert_identifier
name = "strapi-db-parameter-group"  # Should use var.dashed_cmsdomain
```

#### Containers Module (`modules/containers/containers.tf`)
```hcl
# Hardcoded values:
memory = 512                      # Should be var.container_memory
cpu = 256                         # Should be var.container_cpu
containerPort = 1337              # Should be var.container_port
name = "strapi"                   # Should be var.service_name
name = "dgrebbTaskExecutionRole"  # Should be var.execution_role_name or derived
image_tag = "latest"              # Should be var.image_tag
containerInsights = "disabled"    # Should be var.container_insights
```

#### CDN Module (`modules/cdn/cdn.tf`)
```hcl
# Hardcoded values:
price_class = "PriceClass_100"    # Should be var.price_class
default_ttl = 3600                # Should be var.default_ttl
max_ttl = 86400                   # Should be var.max_ttl
minimum_protocol_version = "TLSv1.2_2018"  # Should be var.tls_version
"domain" = "dgrebb.com"           # Hardcoded tag - should be var.domain_tag
```

#### Scaling Module (`modules/scaling/scaling.tf`)
```hcl
# Hardcoded values:
ssl_policy = "ELBSecurityPolicy-2016-08"  # Should be var.ssl_policy
matcher = "200-499"               # Should be var.health_check_matcher
```

---

### 2. Missing Shared Configuration

**Problem**: Environment-specific values (stg/prd) are duplicated across `main.tf` files.

**Current Pattern:**
```hcl
# _tf/stg/main.tf
locals {
  domain = "stg.${var.domain}"
  ...
}

# _tf/prd/main.tf  
locals {
  domain = var.domain  # Different pattern!
  ...
}
```

**Solution**: Create a shared `locals.tf` or use a `tfvars` file per environment.

---

### 3. Environment Prefix Inconsistency

**Problem**: Environment prefix (`stg.`, `prd.`, etc.) is applied inconsistently.

```hcl
# Sometimes prefix is in locals
domain = "stg.${var.domain}"

# Sometimes it's expected in the variable
terraform_state_bucket = "state-stg.dgrebb.com"  # Hardcoded env!
```

**Solution**: Use a consistent `var.environment` and derive all prefixes.

---

### 4. Repeated Module Parameters

**Problem**: Same parameters passed to multiple modules.

```hcl
module "www_cdn" {
  domain        = local.domain
  dashed_domain = local.dashed_domain
  ...
}
module "uploads_cdn" {
  domain        = local.cdndomain
  dashed_domain = local.dashed_cdndomain
  ...
}
```

**Solution**: Use `for_each` or create a wrapper module for CDN+bucket combinations.

---

## Recommended Refactors

### 1. Create `variables.tf` Defaults

Move hardcoded values to variables with sensible defaults:

```hcl
# modules/database/inputs.tf - ADD:
variable "engine_version" {
  type    = string
  default = "16.4"
}

variable "pg_family" {
  type    = string
  default = "postgres16"
}

variable "allocated_storage" {
  type    = number
  default = 5
}

variable "db_name" {
  type    = string
  default = "strapi"
}

variable "db_username" {
  type    = string
  default = "strapi"
}

variable "backup_retention_period" {
  type    = number
  default = 3
}

variable "backup_window" {
  type    = string
  default = "06:00-07:00"
}
```

### 2. Create Environment Configuration Module

```hcl
# modules/environment/main.tf
variable "environment" {
  type = string
  validation {
    condition     = contains(["stg", "prd"], var.environment)
    error_message = "Environment must be stg or prd."
  }
}

variable "base_domain" {
  type = string
}

locals {
  is_production = var.environment == "prd"
  
  prefix = var.environment == "prd" ? "" : "${var.environment}."
  
  domain        = "${local.prefix}${var.base_domain}"
  cmsdomain     = "${local.prefix}cms.${var.base_domain}"
  cdndomain     = "${local.prefix}cdn.${var.base_domain}"
  reportsdomain = "${local.prefix}reports.${var.base_domain}"
  
  dashed_domain = replace(local.domain, ".", "-")
  # ... etc
}

output "domains" {
  value = {
    domain        = local.domain
    cmsdomain     = local.cmsdomain
    cdndomain     = local.cdndomain
    reportsdomain = local.reportsdomain
  }
}
```

### 3. Use `for_each` for CDN Resources

```hcl
# Instead of separate www_cdn, uploads_cdn, reports_cdn modules:
variable "cdn_configs" {
  type = map(object({
    domain        = string
    bucket_module = string
    log_enabled   = bool
    cert_key      = string
  }))
}

module "cdn" {
  for_each = var.cdn_configs
  source   = "../modules/cdn"
  
  domain      = each.value.domain
  bucket      = module.buckets[each.key].bucket
  log_enabled = each.value.log_enabled
  cert        = module.network.certs[each.value.cert_key]
  # ...
}
```

### 4. Create Common Tags Module

```hcl
# modules/common/tags.tf
variable "project" {
  type    = string
  default = "dgrebb"
}

variable "environment" {
  type = string
}

locals {
  common_tags = {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "terraform"
    Domain      = "${var.project}.com"
  }
}

output "tags" {
  value = local.common_tags
}
```

### 5. Consolidate Security Policies

```hcl
# modules/security-policies/main.tf
variable "environment" {
  type = string
}

locals {
  ssl_policies = {
    stg = "ELBSecurityPolicy-TLS13-1-2-2021-06"
    prd = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  }
  
  tls_versions = {
    stg = "TLSv1.2_2021"
    prd = "TLSv1.2_2021"
  }
}

output "ssl_policy" {
  value = local.ssl_policies[var.environment]
}

output "tls_version" {
  value = local.tls_versions[var.environment]
}
```

---

## Action Items Checklist

### Phase 1: Variable Extraction (Low Risk)
- [ ] Extract hardcoded database values to variables
- [ ] Extract hardcoded container specs to variables
- [ ] Extract hardcoded CDN settings to variables
- [ ] Extract hardcoded security policy versions to variables
- [ ] Add variable validation where appropriate

### Phase 2: Environment Abstraction (Medium Risk)
- [ ] Create environment configuration module
- [ ] Standardize domain/prefix derivation
- [ ] Create common tags module
- [ ] Update stg/prd main.tf to use environment module

### Phase 3: Module Consolidation (Higher Risk)
- [ ] Refactor CDN modules to use `for_each`
- [ ] Refactor storage modules to use `for_each`
- [ ] Create composite modules (e.g., cdn-with-bucket)
- [ ] Remove duplicate code across stg/prd

### Phase 4: Documentation & Validation
- [ ] Add README.md to each module
- [ ] Add variable descriptions
- [ ] Add output descriptions
- [ ] Add `terraform fmt` and `terraform validate` to CI
- [ ] Create example tfvars files

---

## Files to Modify

| File | Changes Needed |
|------|---------------|
| `modules/database/inputs.tf` | Add 8+ new variables |
| `modules/database/database.tf` | Replace hardcoded values |
| `modules/containers/inputs.tf` | Add 6+ new variables |
| `modules/containers/containers.tf` | Replace hardcoded values |
| `modules/cdn/inputs.tf` | Add 4+ new variables |
| `modules/cdn/cdn.tf` | Replace hardcoded values, fix tag |
| `modules/scaling/inputs.tf` | Add 2+ new variables |
| `modules/scaling/scaling.tf` | Replace hardcoded values |
| `stg/main.tf` | Use environment module |
| `prd/main.tf` | Use environment module |

---

## Related Documentation

- [TERRAFORM_OUTLINE.md](./TERRAFORM_OUTLINE.md) - Current infrastructure overview
- [CMS_EVALUATION.md](./CMS_EVALUATION.md) - Cost reduction strategies
