<script>
  import * as Sentry from "@sentry/sveltekit";
  import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from "$env/static/public";
  import "@styles/pages/not-found.css";
  import { page } from "$app/stores";

  Sentry.captureMessage("Page Not Found", {
    page: $page.route,
    environment: PUBLIC_ENV,
    beforeSend(event) {
      if (event.user) {
        delete event.user.ip;
      }
      if (event.server_name) {
        delete event.server_name;
      }
    },
  });

</script>

<section class="not-found">
  <a id="main">Main Content</a>
  <h1>404</h1>
  <p>Nothing found here.</p>
  <a href="/">Go Home</a>
</section>
