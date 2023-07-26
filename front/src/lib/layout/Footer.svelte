<script>
  export let copyleft;
  export let copyright;
  const year = new Date().getFullYear();
</script>

<small>
  {#if copyleft}{@html copyleft}{/if}
  {year} AD | {#if copyright}{copyright}{/if}
  | <a href="/privacy">Privacy Policy</a>
</small>
