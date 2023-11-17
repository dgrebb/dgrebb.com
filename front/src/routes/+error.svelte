<script>
  import { page } from '$app/stores';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/not-found.css';
  import { onMount } from 'svelte';
  export let data;
  $: ({ pathname } = data);

  let Sentry;

  onMount(async () => {
    Sentry = await import('@sentry/sveltekit');
  });

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
    <a href="/">Go Home</a>
  </section>
</PageTransition>
