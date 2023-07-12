<script>
  import { plausibleClicks } from "$lib/clicktracking.js";
  const { tocClick } = plausibleClicks;
  export let contents;
</script>

<ul class="toc">
  {#each Object.values(contents) as { text, link }, i}
    <li>
      <a on:click={() => tocClick(text)} href={link}>
        {text}
      </a>
    </li>
  {/each}
</ul>
