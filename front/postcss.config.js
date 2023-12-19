import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import postcssNested from 'postcss-nested';

export default {
  plugins: [atImport, postcssNested, postcssNesting, autoprefixer],
};
