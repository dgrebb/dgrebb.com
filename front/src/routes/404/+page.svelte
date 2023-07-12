<script>
  import PageTransition from "@components/PageTransition.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import "@styles/pages/not-found.css";
  export const trailingSlash = "always";
  export let data;
  $: ({ pathname } = data);
</script>

<PageTransition {pathname}>
  <section class="not-found">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>404</h1>
    <p>Nothing found here.</p>
    <a href="/">Go Home</a>
  </section>
</PageTransition>

<svelte:head>
  <script id="four-ohhhhh-four">
    const { hostname: e } = document.location;
    const environment = e.includes("local")
      ? "development"
      : e.includes("stg")
      ? "staging"
      : "production";
    Sentry.init({
      dsn: "https://02b9c4dc55d14cf5bbdd30b7e592eb9a@o4505287560462336.ingest.sentry.io/4505312527187968",
      tracesSampleRate: 1,
      environment,
      beforeSend(event) {
        if (event.user) {
          delete event.user.ip;
        }
        if (event.server_name) {
          delete event.server_name;
        }
      },
    });
    Sentry.captureMessage("Page Not Found", {
      page: document.location.pathname,
    });
  </script>
</svelte:head>
