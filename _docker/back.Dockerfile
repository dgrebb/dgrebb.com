# -------- Base Node -------- #
FROM node:18-alpine AS base
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base \
    gcc autoconf automake zlib-dev libpng-dev \
    nasm bash vips-dev

# -------- Dependencies -------- #
FROM base AS dependencies
WORKDIR /opt/
COPY package*.json ./
COPY ./patches ./patches
RUN npm ci --include=dev \
    && npm run postinstall  --loglevel verbose \
    && npm cache clean --force

# -------- Build -------- #
FROM base AS build
WORKDIR /opt/
COPY --from=dependencies /opt/node_modules ./node_modules
ENV PATH /opt/node_modules/.bin:$PATH
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
COPY . .
RUN npm run build

# -------- Release -------- #
FROM node:18-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

# -------- Healthcheck -------- #
HEALTHCHECK --interval=30s --timeout=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider \
    http://localhost:1337/_health || exit 1

# -------- Run -------- #
RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]