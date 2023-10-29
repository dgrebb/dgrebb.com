<script>
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';

  export let src;
  export let alt;
  export let title;
  export let width;
  export let height;
  export let classes;
  export let ariaHidden = 'false';

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
    />
  {:else if failed}
    <p>That image was lost. Poor thing.</p>
  {:else if loading}
    <Loading />
  {/if}
</div>
