<script>
  import CC from '@components/icons/CC.svelte';
  export let copyleft;
  export let copyright;
  const year = new Date().getFullYear();
</script>

<small>
  <p>
    {#if copyleft}{@html copyleft}{/if}
  </p>
  <p>
    <CC />
    {#if copyright}{@html copyright}{/if}{year} A.D. | Some Rights Reserved |
    <a href="/privacy">Privacy Policy</a>
  </p>
</small>
