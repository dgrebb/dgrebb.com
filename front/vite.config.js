import { bundleStats } from 'rollup-plugin-bundle-stats';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config.js';

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
    visualizer({
      sourcemap: true,
      template: 'treemap',
      filename: '.report/stats.html',
    }),
    visualizer({
      sourcemap: true,
      template: 'network',
      filename: '.report/network.html',
    }),
    visualizer({
      sourcemap: true,
      template: 'sunburst',
      filename: '.report/sunburst.html',
    }),
    bundleStats({
      outDir: '../../../.report/bundle-stats',
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
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
