import * as Sentry from "@sentry/sveltekit";
import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
  dsn: `${PUBLIC_SENTRY_DSN}`,
  environment: PUBLIC_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/\*\.dgrebb\.com\/api/],
      integrations: [new Sentry.BrowserTracing()],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: ( PUBLIC_ENV === "production" ? 0.1 : 1.0 ),
  replaysSessionSampleRate: ( PUBLIC_ENV === "production" ? 0.1 : 1.0 ),
  replaysOnErrorSampleRate: ( PUBLIC_ENV === "production" ? 0.1 : 1.0 ),
});

export async function handleError({ error, event }) {
  const errorId = crypto.randomUUID();
  Sentry.captureException(error, { extra: { event, errorId } });

  return {
    message: "Client error.",
    errorId,
  };
}
