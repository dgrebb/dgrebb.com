<script>
  import TableOfContents from "@components/content/TableOfContents.svelte";
  import { pokeTrapper } from "@utils/pokeTrapper.js";

  export let contents, categories, related, pathname;

  let { categoryClick, relatedClick } = pokeTrapper;
  
</script>

{#if contents.length}
  <h2>Table of Contents</h2>
  <TableOfContents {contents} />
{/if}
{#if categories.length}
  <h2>Categories</h2>
  <ul class="post-navigation-list">
    {#each categories as { attributes: { name, slug } }, i}
      <li>
        <a
          on:click={() => categoryClick(pathname, name)}
          href="/posts/category/{slug}/">{name}</a
        >
      </li>
    {/each}
  </ul>
{/if}
{#if related.length}
  <h2>Related Posts</h2>
  <ul class="post-navigation-list">
    {#each related as { attributes: { title, slug } }, i}
      <li>
        <a on:click={() => relatedClick(pathname, title)} href="/post/{slug}/"
          >{title}</a
        >
      </li>
    {/each}
  </ul>
{/if}
