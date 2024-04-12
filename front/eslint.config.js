import globals from 'globals';
import js from '@eslint/js';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: ['**/*.svelte', '**/*.js'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        plausible: true,
      },
    },
    rules: {
      'svelte/no-at-html-tags': 'off',
    },
  },
  {
    ignores: ['node_modules', 'build', '.svelte-kit', '.report'],
  },
];
