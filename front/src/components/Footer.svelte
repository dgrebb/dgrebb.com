<script>
  export let copyleft;
  export let copyright;
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <small>
    {#if copyleft}{copyleft}{/if}
    {year}
    {#if copyright}{copyright}{/if}
  </small>
</footer>
