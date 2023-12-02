<script>
  import { page } from '$app/stores';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/not-found.css';
  import * as Sentry from '@sentry/sveltekit';
  export let data;
  $: ({ pathname } = data);

  Sentry.setContext('SvelteKit', {
    url: $page.url,
    params: $page.params,
    route: $page.route.id,
    status: $page.status,
    error: $page.error.message,
    data: $page.data,
  });
  Sentry.captureMessage('Page Not Found', {
    tags: {
      status: 'NOT_FOUND',
    },
    status: 'NOT_FOUND',
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
