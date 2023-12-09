import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
const { UPLOAD_SOURCEMAPS, SENTRY_AUTH_TOKEN, RELEASE_NAME, DIST } =
  process.env;

const sourceMapsUploadOptions = UPLOAD_SOURCEMAPS
  ? {
      authToken: SENTRY_AUTH_TOKEN,
      uploadSourceMaps: true,
      telemetry: false,
      debug: false,
      org: 'dgrebb',
      project: 'dgrebb',
      include: ['build'],
      setCommits: {
        auto: true,
      },
      release: RELEASE_NAME,
      dist: DIST,
      finalize: false,
      deploy: {
        env: 'development',
      },
    }
  : null;

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      autoUploadSourceMaps: false,
      sourceMapsUploadOptions,
    }),
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
    visualizer({
      template: 'treemap',
      filename: '.report/stats.html',
    }),
    visualizer({
      template: 'network',
      filename: '.report/network.html',
    }),
    visualizer({
      template: 'sunburst',
      filename: '.report/sunburst.html',
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
  build: {
    sourcemap: true,
  },
  css: {
    postcss,
    devSourcemap: true,
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
