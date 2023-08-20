import * as Sentry from "@sentry/sveltekit";
import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  environment: PUBLIC_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/\*\.dgrebb\.com\/api/],
      integrations: [new Sentry.BrowserTracing()],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: PUBLIC_ENV === "production" ? 0.3 : 0.5,
  replaysSessionSampleRate: PUBLIC_ENV === "production" ? 0.3 : 0.5,
  replaysOnErrorSampleRate: PUBLIC_ENV === "production" ? 0.3 : 0.5,
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
  Sentry.setTag("environment", PUBLIC_ENV);
  Sentry.captureException(error, { extra: { event } });

  return {
    message: "Client error.",
  };
}
