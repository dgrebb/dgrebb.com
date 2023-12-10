import {
  PUBLIC_ENV as env,
  PUBLIC_RELEASE,
  PUBLIC_SENTRY_DSN,
} from '$env/static/public';
import { init, captureException } from '@sentry/sveltekit';
import { minify } from 'html-minifier-terser';
import { dev, building } from '$app/environment';

init({
  dsn: PUBLIC_SENTRY_DSN,
  release: PUBLIC_RELEASE,
  environment: env,
  integrations: [],
  beforeSend(event) {
    if (event.user) {
      delete event.user.ip;
    }
    if (event.server_name) {
      delete event.server_name;
    }
    return event;
  },
});

export function handleError({ error, event }) {
  if (env === 'production') captureException(error, { extra: { event } });

  console.log('Error:');
  console.log(error);

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
