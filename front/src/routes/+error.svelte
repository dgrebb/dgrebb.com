<script>
  import PageTransition from '@components/general/PageTransition.svelte';
  import '@styles/pages/not-found.css';
  let { data } = $props();
  let pathname = $derived(data.pathname);
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
