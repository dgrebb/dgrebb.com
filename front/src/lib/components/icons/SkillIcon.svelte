<script>
  import { onMount } from 'svelte';

  let loaded = false;
  let failed = false;

  export let name, slug;

  let iconURL = `/v/skills/${slug}.svg#${slug}`;

  onMount(() => {
    const img = new Image();
    img.src = iconURL;

    img.onload = () => {
      loaded = true;
      setTimeout(function () {}, 1000);
    };
    img.onerror = () => {
      const fallback = new Image();
      fallback.src = `/v/skills/_generic.svg#generic`;

      fallback.onload = () => {
        loaded = true;
        failed = true;
        loaded = true;
        iconURL = `/v/skills/_generic.svg#generic`;
      };
    };
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="64"
  height="64"
  class:loaded
  class:failed
  aria-label={name}
>
  <use href={iconURL} />
</svg>
