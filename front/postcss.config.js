import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
export default {
  plugins: [atImport, postcssNesting, autoprefixer],
};
