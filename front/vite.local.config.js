import { bundleStats } from 'rollup-plugin-bundle-stats';
import progress from 'vite-plugin-progress';
import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';

export default defineConfig({
  resolve: {
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
  plugins: [
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
    bundleStats({
      outDir: '../../../.report/bundle/current',
      compare: true,
      baselineFilepath: '../../../.report/bundle/previous/bundle-stats.json',
      json: true,
      html: true,
    }),
    sveltekit(),
    progress(),
  ],
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
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
    environment: 'local',
  },
});
