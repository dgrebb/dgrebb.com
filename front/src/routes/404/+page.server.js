import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_ENV } from '$env/static/public';

console.info('404 - Not Found ~ /404 handler');

Sentry.captureMessage('Page Not Found', {
  environment: PUBLIC_ENV,
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
