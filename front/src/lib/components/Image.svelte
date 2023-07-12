<script>
  import { onMount } from 'svelte'
  import Loading from './Loading.svelte';

  export let src;
  export let alt;
  export let title;
  export let width = null;
  export let height = null;
  export let classes = null;
  export let ariaHidden = "false";

  let loaded = false;
  let failed = false;
  let loading = true;

  onMount(() => {
    const img = new Image();
    img.src = src;
    loading = true;

    img.onload = () => {
        loading = false;
        loaded = true;
    };
    img.onerror = () => {
        loading = false;
        failed = true;
    };
  })
</script>

{#if loaded}
  <img
    {src}
    {alt}
    {title}
    {width}
    {height}
    class={classes}
    aria-hidden={ariaHidden}
  />
{:else if failed}
  <p>That image was lost. Poor thing.</p>
  <script>
    Sentry.captureMessage("Image Not Found", {
      image: src,
      page: document.location.pathname,
      { hostname }: document.location,
    });
  </script>
{:else if loading}
  <div class="image-loader" style={`height: ${height}px; width: ${width}px`}>
    <Loading />
  </div>
{/if}
