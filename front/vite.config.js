import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        telemetry: false,
        debug: true,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        rewrite: false,
        org: 'dgrebb',
        project: 'dgrebb',
        release: {
          name: process.env.SENTRY_RELEASE,
          finalize: false,
          setCommits: {
            auto: true,
          },
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
});
