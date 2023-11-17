<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/not-found.css';
  export let data;
  let Sentry;

  $: ({ pathname } = data);

  onMount(async () => {
    Sentry = await import('@sentry/sveltekit');
    Sentry.setContext('SvelteKit', {
      url: $page.url,
      params: $page.params,
      route: $page.route,
      status: $page.status,
      error: $page.error,
      data: $page.data,
    });
    Sentry.captureMessage('Page Not Found', {
      trace: {
        status: 'NOT_FOUND',
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
    <a href="/">Go Home</a>
  </section>
</PageTransition>
