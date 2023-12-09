import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from '$env/static/public';
import { onMount } from 'svelte';

let init, BrowserTracing, setTag, captureException;

onMount(async function () {
  ({ init, BrowserTracing, setTag, captureException } = await import(
    '@sentry/sveltekit'
  ));

  init({
    dsn: PUBLIC_SENTRY_DSN,
    debug: PUBLIC_ENV === 'development' ? false : false,
    environment: PUBLIC_ENV,
    integrations: [new BrowserTracing()],
    normalizeDepth: 0,
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
});

export async function handleError({ error, event }) {
  setTag('environment', PUBLIC_ENV);
  captureException(error, { extra: { event } });

  return {
    message: 'Client error.',
  };
}
