<script>
  import { onMount } from 'svelte';

  export let iconURL, slug, iconAltText;

  let loaded = false;
  let failed = false;

  onMount(() => {
    const img = new Image();
    img.src = iconURL;

    img.onload = () => {
      loaded = true;
      setTimeout(function () {}, 1000);
    };
    img.onerror = () => {
      failed = true;
    };
  });
</script>

{#if iconAltText}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    class:loaded
    class:failed
    aria-label={iconAltText}
  >
    <use href="{iconURL}#{slug}" />
  </svg>
{:else}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    class:loaded
    class:failed
  >
    <use href="{iconURL}#{slug}" />
  </svg>
{/if}
