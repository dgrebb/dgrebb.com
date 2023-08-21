<script>
  import { page } from '$app/stores';
  import PageTransition from '@components/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import * as Sentry from '@sentry/sveltekit';
  import '@styles/pages/not-found.css';
  import { error } from '@sveltejs/kit';
  export let data;
  $: ({ pathname } = data);
  Sentry.setContext('SvelteKit', {
    page: $page,
  });
  Sentry.captureMessage('Page Not Found', {
    extra: {
      error,
    },
  });
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
