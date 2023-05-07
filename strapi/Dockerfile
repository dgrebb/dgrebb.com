FROM node:16-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

COPY package*.json /tmp
RUN cd /tmp && npm ci
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
COPY ./ .
ENV PATH /opt/app/node_modules/.bin:$PATH
RUN strapi build

# HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:1337/_health || exit 1

EXPOSE 1337
CMD strapi start