import * as Sentry from "@sentry/sveltekit";
import crypto from "crypto";
import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from "$env/static/public";

Sentry.init({
  dsn: PUBLIC_SENTRY_DSN,
  environment: PUBLIC_ENV,
  tracesSampleRate: PUBLIC_ENV === "production" ? 0.1 : 1.0,
  profilesSampleRate: PUBLIC_ENV === "production" ? 0.1 : 1.0,
  integrations: [],
  beforeSend(event) {
    if (event.user) {
      delete event.user.ip;
    }
    if (event.server_name) {
      delete event.server_name;
    }
});

export async function handleError({ error, event }) {
  const errorId = crypto.randomUUID();
  Sentry.captureException(error, { extra: { event, errorId } });

  console.log(`\x1b[33mError: ${error}`);

  return {
    message: "Server error!",
    errorId,
  };
}