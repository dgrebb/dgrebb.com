import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';

const sourceMapsUploadOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  uploadSourceMaps: true,
  telemetry: false,
  debug: false,
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
};

export default defineConfig({
  plugins: [
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
    process.env.UPLOAD_SOURCEMAPS
      ? sentrySvelteKit({
          sourceMapsUploadOptions,
        })
      : null,
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
      '@shape-shifters': path.resolve('./src/lib/_utils/shape-shifters'),
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
