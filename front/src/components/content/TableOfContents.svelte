<script>
  import { plausibleClicks } from "$lib/clicktracking.js";
  const { tocClick } = plausibleClicks;
  export let contents;
</script>

<ul class="toc">
  {#each Object.entries(contents) as [id, { text, link }], i (id)}
    <li><a on:click={tocClick(text)} href={link}>{text}</a></li>
  {/each}
</ul>
