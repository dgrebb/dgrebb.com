<script>
  import * as Sentry from "@sentry/svelte";
  import "../styles/not-found.css";
  import { page } from "$app/stores";

  Sentry.captureMessage("Page Not Found", {
    page: $page.route
  });

</script>

<section class="not-found">
  <h1>404</h1>
  <p>Nothing found here.</p>
  <a href="/">Go Home</a>
</section>
