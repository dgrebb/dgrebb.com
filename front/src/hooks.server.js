import * as Sentry from "@sentry/sveltekit";
import crypto from "crypto";
import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
  dsn: `${PUBLIC_SENTRY_DSN}`,
  tracesSampleRate: PUBLIC_ENV === "production" ? 0.1 : 1.0,
  profilesSampleRate: PUBLIC_ENV === "production" ? 0.1 : 1.0,
  integrations: [],
});

export async function handleError({ error, event }) {
  const errorId = crypto.randomUUID();
  Sentry.setTag("environment", PUBLIC_ENV);
  Sentry.captureException(error, { extra: { event, errorId } });

  return {
    message: "Server error!",
    errorId,
  };
}