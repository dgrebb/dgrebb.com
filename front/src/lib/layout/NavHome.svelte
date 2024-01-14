<script>
  export let route;
  export let navHeading;
</script>

<a class="nav-home" href="/" aria-label="Dan Grebb | Home">
  {#if route === '/'}
    <h1>{navHeading}</h1>
  {:else}
    {navHeading}
  {/if}
</a>
