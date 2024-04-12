<script>
  import { onMount } from 'svelte';

  export let src;
  export let alt;
  export let title;
  export let width;
  export let height;
  export let classes;
  export let loadingMethod = 'lazy';
  export let ariaHidden = 'false';

  let loaded = false;
  let failed = false;
  let loading = true;

  /**
   * Lifecycle function executed after the component is mounted.
   * Asynchronously loads the image and updates the component state accordingly.
   *
   * @function onMount
   * @async
   * @throws {Error} - Throws an error if image loading fails.
   */
  onMount(async function () {
    try {
      const img = new Image();
      img.src = src;

      await img.decode();
      loading = false;
      loaded = true;
    } catch {
      loading = false;
      failed = true;
      console.warn('An image was expected here, but could not be found.');
    }
  });
</script>

<div
  class="image-loader"
  class:loaded
  style={`height: ${height}px; width: ${width}px`}
>
  {#if loaded}
    <img
      {src}
      {alt}
      {title}
      {width}
      {height}
      class={classes}
      aria-hidden={ariaHidden}
      loading={loadingMethod}
    />
  {:else if failed}
    <p>That image was lost. Poor thing.</p>
  {:else if loading}
    <p class="sr-only">Loading...</p>
  {/if}
</div>
