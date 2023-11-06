import path from 'path';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    appDir: 's',
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: true,
      strict: true,
      hooks: {
        client: '$lib/_hooks/hooks.client.js',
        server: '$lib/_hooks/hooks.server.js',
      },
    }),
    alias: {
      '@api': path.resolve('./src/lib/api'),
      '@components': path.resolve('./src/lib/components'),
      '@layout': path.resolve('./src/lib/layout'),
      '@store': path.resolve('./src/lib/store'),
      '@styles': path.resolve('./src/lib/styles'),
      '@utils': path.resolve('./src/lib/_utils'),
    },
    inlineStyleThreshold: Infinity,
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path === '/404' && referrer === '/privacy/') {
          return;
        }
        if (process.env.WARN_ONLY && path.includes('/uploads')) {
          return;
        }
        throw new Error(message);
      },
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
