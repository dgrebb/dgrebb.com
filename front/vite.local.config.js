import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        authToken: process.env.SENTRY_AUTH_TOKEN,
        uploadSourceMaps: process.env.UPLOAD_SOURCEMAPS || false,
        telemetry: false,
        debug: true,
        org: 'dgrebb',
        project: 'dgrebb',
        include: ['build'],
        setCommits: {
          auto: true,
        },
        release: process.env.RELEASE_NAME,
        dist: process.env.DIST,
        finalize: false,
        deploy: {
          env: 'development',
        },
      },
    }),
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  resolve: {
    alias: {
      '@api': path.resolve('./src/lib/api'),
      '@components': path.resolve('./src/lib/components'),
      '@layout': path.resolve('./src/lib/layout'),
      '@store': path.resolve('./src/lib/store'),
      '@styles': path.resolve('./src/lib/styles'),
      '@utils': path.resolve('./src/lib/_utils'),
    },
  },
  css: {
    postcss,
  },
  optimizeDeps: {
    include: ['highlight.js/lib/core'],
  },
  server: {
    proxy: {
      '^/uploads/.*': {
        target: 'http://local.cms.dgrebb.com:1337/uploads',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, ''),
      },
    },
    https: {
      key: fs.readFileSync('local.dgrebb.com.key'),
      cert: fs.readFileSync('local.dgrebb.com.crt'),
    },
    port: 443,
  },
});
