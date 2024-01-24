<script>
  /**
   * Svelte component for displaying an SVG icon based on a provided slug.
   * @module IconComponent
   * @param {string} name - The aria-label for the SVG icon.
   * @param {string} slug - The unique identifier for the icon.
   * @param {string} iconColor - The color to use for SVG `currentColor`.
   */
  import { onMount } from 'svelte';

  /**
   * Flag indicating whether the icon is successfully loaded.
   * @type {boolean}
   */
  let loaded = false;

  /**
   * Flag indicating whether loading the icon has failed.
   * @type {boolean}
   */
  let failed = false;

  /** @type {string} */
  export let name;

  /** @type {string} */
  export let slug;

  /** @type {string} */
  export let classes = false;

  /** @type {string} */
  export let iconColor = false;

  /**
   * URL for the SVG icon based on the provided slug.
   * @type {string}
   */
  let iconURL = `/v/skills/${slug}.svg#${slug}`;

  /**
   * Handles the successful load of the SVG icon.
   */
  const handleLoad = () => {
    loaded = true;
  };

  /**
   * Handles the successful load of the fallback icon in case of an error.
   */
  const handleFallback = () => {
    /**
     * Image object for loading the fallback icon.
     * @type {HTMLImageElement}
     */
    const fallback = new Image();
    fallback.src = `/v/skills/_generic.svg#generic`;
    fallback.onload = () => {
      loaded = true;
      failed = true;
      loaded = true;
      iconURL = `/v/skills/_generic.svg#generic`;
    };
  };

  /**
   * Lifecycle function called when the component is mounted.
   */
  onMount(() => {
    /**
     * Image object for loading the SVG icon.
     * @type {HTMLImageElement}
     */
    const img = new Image();
    img.src = iconURL;

    img.onload = () => handleLoad();

    img.onerror = () => {
      handleFallback();
    };
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="64"
  height="64"
  class={classes}
  class:loaded
  class:failed
  aria-label={name}
  style={iconColor ? `color: ${iconColor}; filter: brightness(1.3);` : false}
>
  <use href={iconURL} />
</svg>
