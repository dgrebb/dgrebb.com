<script>
  /**
   * PostHero component.
   * @class
   * @extends {SvelteComponent}
   *
   * @typedef {Object} Props
   * @property {string} heroImage - URL of the hero image.
   * @property {string} heroMime - MIME type of the hero image.
   * @property {string} heroThumb - URL of the hero thumbnail.
   * @property {boolean} loaded - Flag indicating whether the hero image is loaded.
   * @property {string} position - CSS background position for the images.
   */

  /**
   * @type {Props}
   */
  export let heroImage;

  /**
   * @type {Props}
   */
  export let heroMime;

  /**
   * @type {Props}
   */
  export let heroThumb;

  /**
   * @type {Props}
   */
  export let loaded;

  /**
   * @type {Props}
   */
  export let position;
</script>

<svelte:head>
  {#if heroThumb}
    <link
      rel="preload"
      fetchpriority="high"
      as="image"
      href={heroThumb}
      type={heroMime}
    />
  {/if}
  {#if heroImage}
    <link
      rel="preload"
      fetchpriority="high"
      as="image"
      href={heroImage}
      type={heroMime}
    />
  {/if}
</svelte:head>

{#if heroImage}
  <div class={`post-hero-wrap ${heroImage ? 'show' : 'hide'}`}>
    <div
      class="post-hero"
      class:loaded
      style={`background-image: url('${heroImage}'); background-position: ${position}`}
    />
    <div
      class={`post-hero {loaded ? 'post-hero-loaded' : ''}`}
      style={`background-image: url('${heroThumb}'); background-position: ${position}`}
    />
    <noscript>
      <div
        class="post-hero noscript"
        style="background-image: url('{heroImage}'); background-position: {position};"
      />
    </noscript>
  </div>
{/if}
