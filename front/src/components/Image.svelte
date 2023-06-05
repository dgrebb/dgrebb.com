<script>
  import { onMount } from 'svelte'
  import Loading from './Loading.svelte';

  export let src;
  export let alt;
  export let title;
  export let width;
  export let height;
  export let classes;
  export let ariaHidden = "false";

  let loaded = false;
  let failed = false;
  let loading = false;

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
  <p>That image wasn't found.</p>
{:else if loading}
  <!-- TODO: implement blurhash here -->
  <Loading />
{/if}
