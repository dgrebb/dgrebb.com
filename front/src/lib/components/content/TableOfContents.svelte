<script>
  import { pokeTrapper } from "@utils/pokeTrapper.js";
  const { tocClick } = pokeTrapper;
  export let contents;
</script>

<ul class="toc">
  {#each Object.values(contents) as { text, link }, i}
    <li>
      <a
        on:click={() => tocClick(text)}
        href={link}
        data-sveltekit-replacestate
      >
        {text}
      </a>
    </li>
  {/each}
</ul>
