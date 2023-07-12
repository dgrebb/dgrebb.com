<script>
  import { plausibleClicks } from '$lib/clicktracking.js';
  const { tocClick } = plausibleClicks;
  export let contents;
</script>

<ul class="toc">
  {#each contents as item}
    <li><a on:click={tocClick(item.text)} href="{item.link}">{item.text}</a></li>
  {/each}
</ul>