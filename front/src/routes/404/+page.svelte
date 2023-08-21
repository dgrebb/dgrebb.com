<script>
  import PageTransition from '@components/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/not-found.css';
  export let data;
  $: ({ pathname } = data);
</script>

<PageTransition transitionKey={pathname}>
  <section class="not-found">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>404</h1>
    <p>Nothing found here.</p>
    <a href="/">Go Home</a>
  </section>
</PageTransition>

<svelte:head>
  <script
    src="https://js.sentry-cdn.com/02b9c4dc55d14cf5bbdd30b7e592eb9a.min.js"
    crossorigin="anonymous"
  ></script>
  <script id="four-ohhhhh-four">
    const { hostname: sentEnv } = document.location;
    const environment = sentEnv.includes('local')
      ? 'development'
      : sentEnv.includes('stg')
      ? 'staging'
      : 'production';
    if (Sentry) {
      Sentry.init({
        dsn: 'https://02b9c4dc55d14cf5bbdd30b7e592eb9a@o4505287560462336.ingest.sentry.io/4505312527187968',
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        environment,
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
      Sentry.captureMessage('Page Not Found', {
        page: document.location.pathname,
      });
    }
  </script>
</svelte:head>
