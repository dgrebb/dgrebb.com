<script>
  import { PUBLIC_ENV, PUBLIC_SENTRY_DSN } from '$env/static/public';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/not-found.css';

  const { pathname, href } = $page.url;

  let init, setContext, captureMessage;
  onMount(async function () {
    ({ init, setContext, captureMessage } = await import('@sentry/sveltekit'));
    init({
      dsn: PUBLIC_SENTRY_DSN,
      debug: PUBLIC_ENV === 'development' ? false : false,
      environment: PUBLIC_ENV,
      integrations: [],
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
    setContext('Page Details', {
      url: href,
      pathname,
      status: 404,
    });
    captureMessage(`Page Not Found: ${href}`, {
      beforeSend(event) {
        if (event.user) {
          delete event.user;
        }
        if (event.server_name) {
          delete event.server_name;
        }
        return event;
      },
    });
  });
</script>

<svelte:head>
  <title>404!</title>
</svelte:head>

<PageTransition transitionKey={pathname}>
  <section class="not-found">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>404</h1>
    <p>Nothing found here.</p>
    <p>«&nbsp;<a href="/">Go Home</a></p>
  </section>
</PageTransition>
