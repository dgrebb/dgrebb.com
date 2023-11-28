<script>
  import { onMount } from 'svelte';

  export let iconURL,
    slug = false;

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

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="64"
  height="64"
  class:loaded
  class:failed
>
  <use href="{iconURL}#{slug}" />
</svg>
