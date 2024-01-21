# -------- Base -------- #
FROM node:20-alpine AS base
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base \
    gcc autoconf automake zlib-dev libpng-dev \
    nasm bash vips-dev
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# -------- Dependencies -------- #
# FROM base AS dependencies
# COPY package.json pnpm-lock.yaml ./
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 

# -------- Build -------- #
FROM base AS build
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN pnpm run build

# -------- Run -------- #
FROM node:20-alpine
COPY --from=build /app /app
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PATH="/app/node_modules/.bin:$PATH"
RUN apk add --no-cache vips-dev
RUN corepack enable

HEALTHCHECK --interval=30s --timeout=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider \
    http://localhost:1337/_health || exit 1

# RUN chown -R node:node /app
# USER node
EXPOSE 1337
CMD ["pnpm", "start"]