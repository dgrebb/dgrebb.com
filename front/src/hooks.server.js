import { minify } from 'html-minifier-terser';
import { dev, building } from '$app/environment';

export function handleError({ error, event }) {
  if (event.url.pathname.startsWith('/v/skills')) {
    return;
  }

  console.warn('----------------------------')
  console.dir({
    params: event.params,
    route: event.route,
  });
  console.warn(error);

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
  let response;
  if (event.url.pathname.startsWith('/uploads')) {
    return new Response('Local Image');
  } else {
    response = resolve(event);
  }

  if (!dev && building) {
    console.log(event.url.href);
    response = await resolve(event, {
      transformPageChunk: ({ html }) => minify(html, minification_options),
    });
  }

  return response;
}
