<script>
  export let heroImage;
  export let loaded;
  export let position;
  export let heroThumb;
</script>

{#if heroImage}
  <div class="hero-wrap {heroImage ? 'show' : 'hide'}">
    {#if loaded}
      <div
        class="hero loaded"
        style={heroImage &&
          `background-image: url('${heroImage}'); background-position: ${position};`}
      />
    {/if}
    <div
      class="hero hero-thumbnail {loaded ? 'loaded' : null}"
      style={heroThumb &&
        `background-image: url('${heroThumb}'); background-position: ${position};`}
    />
    <noscript>
      <div
        class="hero noscript"
        style={heroImage &&
          `background-image: url('${heroImage}'); background-position: ${position};`}
      />
    </noscript>
  </div>
{/if}
