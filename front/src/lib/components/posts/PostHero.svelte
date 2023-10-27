<script>
  export let heroImage;
  export let heroMime;
  export let heroThumb;
  export let loaded;
  export let position;
</script>

<svelte:head>
  <link
    rel="preload"
    fetchpriority="high"
    as="image"
    href={heroThumb}
    type={heroMime}
  />
  <link
    rel="preload"
    fetchpriority="high"
    as="image"
    href={heroImage}
    type={heroMime}
  />
</svelte:head>

{#if heroImage}
  <div class="hero-wrap {heroImage ? 'show' : 'hide'}">
    <div
      class="hero"
      class:loaded
      style={heroImage &&
        `background-image: url('${heroImage}'); background-position: ${position};`}
    />
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
