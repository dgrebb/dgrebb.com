<script>
  import { pokeTrapper } from '@utils/pokeTrapper.js';
  import SvelteMarkdown from 'svelte-markdown';
  const { tocClick } = pokeTrapper;
  export let contents;
  export let pageFenceClickHandler = null;
  export let activeLink = null;
  export let setActiveLink = null;
</script>

<ul class="toc">
  {#each Object.values(contents) as { text, link }, i}
    <li>
      <a
        on:click={(e) => {
          tocClick(text);
          setActiveLink(e);
          pageFenceClickHandler(e);
        }}
        href={link}
        data-sveltekit-replacestate
        data-sveltekit-noscroll="false"
        use:activeLink
      >
        <SvelteMarkdown source={text} isInline />
      </a>
    </li>
  {/each}
</ul>
