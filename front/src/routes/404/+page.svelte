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
