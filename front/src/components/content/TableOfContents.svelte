<script>
  export let contents;
</script>

<ul class="toc">
  {#each contents as item}
    <li><a href="{item.link}">{item.text}</a></li>
  {/each}
</ul>