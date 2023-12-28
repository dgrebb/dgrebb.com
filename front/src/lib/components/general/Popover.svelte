<script>
  export let show = false;
  export let title = false;
  export let content = false;
</script>

<div class="popover" class:show>
  {#if title}<header>
      <h1>{title}</h1>
    </header>{/if}
  {#if content}
    <main>
      {@html content}
    </main>
  {/if}
</div>
