# -------- Base Node -------- #
FROM node:18-alpine AS base
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# -------- Dependencies -------- #
FROM base AS dependencies
COPY package*.json /tmp
RUN cd /tmp && npm ci

# -------- Release -------- #
FROM base AS release
RUN mkdir -p /opt/app
COPY --from=dependencies /tmp /opt/app/
WORKDIR /opt/app
COPY ./ .
ENV PATH /opt/app/node_modules/.bin:$PATH
RUN strapi build

# -------- Healthcheck -------- #
HEALTHCHECK --interval=30s --timeout=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:1337/_health || exit 1

# -------- Run -------- #
EXPOSE 1337
CMD strapi start