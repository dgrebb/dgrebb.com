import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import tailwindcssNesting from 'tailwindcss/nesting/index.js';
export default {
  plugins: [
    atImport,
    tailwindcssNesting,
    tailwind(tailwindConfig),
    autoprefixer,
  ],
};
