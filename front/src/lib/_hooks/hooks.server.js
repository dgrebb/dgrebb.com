import { minify } from 'html-minifier-terser';
import { dev, building } from '$app/environment';

export function handleError({ error, event }) {
  console.warn(`Error: ${error}`);
  console.warn(`Event: ${event}`);

  return {
    message: 'Whoops!',
    code: error?.code ?? 'UNKNOWN',
  };
}

const minification_options = {
  collapseWhitespace: true,
  collapseInlineTagWhitespace: false,
  removeComments: false,
  minifyCSS: true,
  minifyJS: true,
};

export async function handle({ event, resolve }) {
  let response = resolve(event);

  if (!dev && building) {
    response = await resolve(event, {
      transformPageChunk: ({ html }) => minify(html, minification_options),
    });
  }

  return response;
}
