<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import '@styles/pages/not-found.css';

  const { pathname } = $page.url;

  onMount(async function () {
    document.body.classList.toggle('ready', true);
  });
</script>

<svelte:head>
  <title>404!</title>
</svelte:head>

<PageTransition transitionKey={pathname}>
  <section class="not-found">
    <span class="flourish" />
    <a id="main">Main Content</a>
    <h1>404</h1>
    <p>Nothing found here.</p>
    <p>«&nbsp;<a href="/">Go Home</a></p>
  </section>
</PageTransition>
