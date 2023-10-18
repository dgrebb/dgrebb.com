<script>
  import CreativeCommons from '@components/icons/CreativeCommons.svelte';
  export let copyleft;
  export let copyright;
  const year = new Date().getFullYear();
</script>

<small>
  {#if copyleft}
    <p>{@html copyleft}</p>
  {/if}
  <p>
    <CreativeCommons />
    {#if copyright}{copyright}{/if}{year} A.D. | Some Rights Reserved |
    <a href="/privacy">Privacy Policy</a>
  </p>
</small>
