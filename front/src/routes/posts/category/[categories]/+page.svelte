<script>
  import PageTransition from "@components/PageTransition.svelte";
  import Flourish from "@layout/Flourish";

  export let data;
  let mounted = false;
  const { pathname } = data;
</script>

<PageTransition>
  <section class="categories">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>Categories</h1>
  </section>
</PageTransition>
