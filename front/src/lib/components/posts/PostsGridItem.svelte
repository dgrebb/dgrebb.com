<script>
  import { PATHS } from '$lib/CONSTANTS';
  import { onMount } from 'svelte';
  import '@styles/components/posts-grid.css';

  const postPath = PATHS.one.post;
  export let lazyImage, slug, title;
  let loaded = false;

  /**
   * Lifecycle function executed after the component is mounted.
   * Asynchronously loads the image and updates the component state accordingly.
   *
   * @function onMount
   * @async
   * @throws {Error} - Throws an error if image loading fails.
   */
  onMount(async function () {
    /**
     * Image object for loading the SVG icon.
     * @type {HTMLImageElement}
     */
    const img = new Image();
    img.src = lazyImage;

    img.onload = function () {
      loaded = true;
    };
  });
</script>

<li
  class:loaded
  class="posts-grid-item"
  style={lazyImage && `background-image: url('${lazyImage}');`}
>
  <a href="{postPath}/{slug}/" class="posts-grid-link" class:loaded>
    <h2 class="link-bg">{title}</h2>
  </a>
</li>

<style lang="postcss">
  .posts-grid-item {
    opacity: 0;
    transition-duration: var(--transition-duration);
    transition-property: opacity;
    transition-timing-function: var(--transition-timing-function);
    &.loaded {
      opacity: 1;
    }
  }
</style>
