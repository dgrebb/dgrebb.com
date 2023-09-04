import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from '$env/static/public';

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  debug: PUBLIC_ENV === 'development' ? true : false,
  environment: PUBLIC_ENV,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracePropagationTargets: ['localhost', /^https:\/\/\*\.dgrebb\.com\/api/],
  tracesSampleRate:
    PUBLIC_ENV === 'production' ? 0.5 : PUBLIC_ENV === 'staging' ? 0.25 : 0,
  replaysSessionSampleRate:
    PUBLIC_ENV === 'production' ? 0.5 : PUBLIC_ENV === 'staging' ? 0.25 : 0,
  replaysOnErrorSampleRate:
    PUBLIC_ENV === 'production' ? 1 : PUBLIC_ENV === 'staging' ? 0.25 : 0,
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
