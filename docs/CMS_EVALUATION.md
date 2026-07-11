# CMS Evaluation: Strapi 5 vs Alternatives

## Executive Summary

This document evaluates CMS options for dgrebb.com with a focus on:
1. Cost reduction (eliminating RDS/load balancer)
2. SSG compatibility for GitHub Actions builds
3. Migration effort from Strapi 4.25.2

## Current Architecture

- **CMS**: Strapi 4.25.2
- **Database**: PostgreSQL 15.5 on AWS RDS
- **Infrastructure**: ECS/Fargate + ALB
- **Front-end**: SvelteKit with SSG (adapter-static)
- **Content Types**: 25 API endpoints

## Option 1: Strapi 5 with SQLite

### Overview
Upgrade to Strapi 5 and switch from PostgreSQL to SQLite for cost reduction.

### Pros
- Minimal migration effort (same API structure)
- No database server required
- SQLite 3 fully supported in Strapi 5
- Uses `better-sqlite3` package (modernized WAL mode)
- Eliminates RDS costs (~$15-30/month)

### Cons
- **Not recommended for production** by Strapi
- SQLite limitations:
  - No concurrent writes
  - Single-writer model
  - Risk of "database locked" errors
  - No transaction isolation
- Still requires CMS server running (ECS/container costs)

### Verdict
**Not recommended** for this use case. SQLite is for development/testing only.

---

## Option 2: Git-Based CMS (TinaCMS, Keystatic, Decap)

### Overview
Move content from database to Git repository as Markdown/JSON files.

### Candidates

| CMS | GitHub Stars | Strengths | SvelteKit Support |
|-----|-------------|-----------|-------------------|
| TinaCMS | ~9K | Visual in-context editing | Via API |
| Keystatic | ~4K | Best Astro integration, clean UI | Via API |
| Decap CMS | ~18K | Most mature, many backends | Via API |

### Pros
- **Zero infrastructure cost** (content in Git)
- Perfect for SSG builds
- No API latency during build
- Version control for content
- Works entirely in GitHub Actions

### Cons
- **Significant migration effort** - must convert 25 content types
- Complex content relations harder to model
- No real-time preview without development server
- Limited for non-technical editors

### Migration Effort: **HIGH**
- Requires restructuring all content as files
- Rebuild data fetching layer
- Create new admin editing workflow

---

## Option 3: Payload CMS (Next.js Native)

### Overview
TypeScript-first CMS that integrates directly with Next.js (now owned by Figma).

### Pros
- Code-first, type-safe schemas
- Native Next.js integration
- SQLite support via better-sqlite3
- Can deploy to Vercel with database

### Cons
- **Not compatible with SvelteKit** - designed for Next.js
- Would require frontend framework change
- Significant rewrite effort

### Verdict
**Not suitable** - requires abandoning SvelteKit.

---

## Option 4: Directus (Database-First)

### Overview
Wraps any SQL database with instant API and admin panel.

### Pros
- Can use existing PostgreSQL data
- Instant API generation
- Visual data studio
- SQLite support for low-traffic

### Cons
- Still requires running server
- Migration from Strapi schema required
- Different content modeling approach

### Migration Effort: **MEDIUM**

---

## Option 5: Export-at-Build Architecture

### Overview
Keep Strapi as content editing tool but generate static JSON at build time, eliminating runtime CMS dependency.

### Architecture
```
GitHub Actions Workflow:
1. Spin up temporary Strapi + SQLite container
2. Seed database from exported content
3. Fetch all content via API → static JSON files  
4. Build SvelteKit with static JSON as data source
5. Deploy static build to S3 + CloudFront
6. Destroy Strapi container
```

### Pros
- **Minimal code changes** - keep Strapi content model
- **Zero runtime infrastructure** - only S3 + CloudFront
- Content can be version-controlled (exported JSON)
- SSG build reads local files, not API

### Cons
- More complex build pipeline
- Content editing requires local Strapi
- Changes need rebuild/deploy cycle

### Implementation
1. Add `strapi export` to CI pipeline
2. Create SvelteKit data adapter for static JSON
3. Store content exports in repo or artifact

### Migration Effort: **LOW-MEDIUM**

---

## Recommendation

### Short-Term (Immediate Cost Reduction)
**Option 5: Export-at-Build Architecture**

- Eliminates RDS (~$15-30/month)
- Eliminates ECS/ALB (~$50-100/month)
- Keeps familiar Strapi workflow
- Minimal code changes to SvelteKit

### Long-Term (Best DX)
Consider **Git-Based CMS (Keystatic or TinaCMS)** when ready for larger refactor:
- Zero infrastructure
- Content versioned in Git
- Better for solo maintainer workflow

---

## Cost Analysis

| Architecture | Monthly Cost (Est.) | Infrastructure |
|--------------|-------------------|----------------|
| Current (Strapi + RDS + ECS) | $80-150 | RDS + ECS + ALB + S3 + CloudFront |
| Strapi on EC2/Lightsail | $20-40 | EC2/Lightsail + S3 + CloudFront |
| Export-at-Build | $5-15 | S3 + CloudFront only |
| Git-Based CMS | $5-15 | S3 + CloudFront only |

---

## Next Steps

1. Create GitHub Actions workflow for export-at-build pattern
2. Test Strapi 5 migration in local environment
3. Evaluate content editing workflow for solo maintainer
4. Consider Keystatic for future content architecture
