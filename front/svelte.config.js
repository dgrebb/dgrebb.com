import { PATHS } from './src/lib/CONSTANTS.js';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const {
  landing: { cv, privacy, experiences, categories, rss, fof },
} = PATHS;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    if (warning.code === 'css-unused-selector') {
      return;
    }
    handler(warning);
  },
  kit: {
    appDir: 's',
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: true,
      // strict: true,
    }),
    alias: {
      '@api': path.resolve('./src/lib/api'),
      '@components': path.resolve('./src/lib/components'),
      '@layout': path.resolve('./src/lib/layout'),
      '@store': path.resolve('./src/lib/store'),
      '@styles': path.resolve('./src/lib/styles'),
      '@utils': path.resolve('./src/lib/_utils'),
      '@shape-shifters': path.resolve('./src/lib/_utils/shape-shifters'),
      '@markers': path.resolve('./src/lib/components/content/markers'),
      '@layouts': path.resolve('./src/routes/(layouts)'),
    },
    inlineStyleThreshold: Infinity,
    prerender: {
      entries: [cv, experiences, categories, privacy, fof, rss],
      handleHttpError: ({ path, referrer, message }) => {
        if (path === fof && referrer === `${privacy}/`) {
          return;
        }
        if (path.includes('/uploads') || /^\/cv\//.test(path)) {
          return;
        }
        if (path.includes('/v') || path.includes(cv)) {
          return;
        }
        throw new Error(message);
      },
      handleMissingId: 'ignore',
    },
  },
};

export default config;
