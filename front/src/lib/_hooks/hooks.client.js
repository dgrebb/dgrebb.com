import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from '$env/static/public';

let Sentry;

onMount(async () => {
  Sentry = await import('@sentry/sveltekit');
});

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  debug: PUBLIC_ENV === 'development' ? false : false,
  environment: PUBLIC_ENV,
  integrations: [new Sentry.BrowserTracing()],
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

export async function handleError({ error, event }) {
  Sentry.setTag('environment', PUBLIC_ENV);
  Sentry.captureException(error, { extra: { event } });

  return {
    message: 'Client error.',
  };
}
