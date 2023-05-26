FROM node:18-alpine AS base

ARG API_HOST
ARG API_KEY
ARG API_NAVIGATION
ARG API_HOME
ARG API_POSTS
ARG API_POST
ARG API_CATEGORIES
ENV API_HOST=$API_HOST
ENV API_KEY=$API_KEY
ENV API_NAVIGATION=$API_NAVIGATION
ENV API_HOME=$API_HOME
ENV API_POSTS=$API_POSTS
ENV API_POST=$API_POST
ENV API_CATEGORIES=$API_CATEGORIES

ENV NODE_ENV production

# Install dependencies only when needed
FROM base AS deps
WORKDIR /tmp
RUN apk add --no-cache libc6-compat
ADD package.json package-lock.json* /tmp/
RUN npm ci && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /tmp/node_modules /app/node_modules
COPY . /app
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]