<script>
  export let copyleft;
  export let copyright;
  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <small>
    {#if copyleft}{copyleft}{/if}
    {year} AD 
    | {#if copyright}{copyright}{/if}
    | <a href="/privacy">Privacy Policy</a>
  </small>
</footer>
