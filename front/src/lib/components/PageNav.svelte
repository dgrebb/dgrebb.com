<script>
  import TableOfContents from "@components/content/TableOfContents.svelte";
  import ClosePostNav from "@components/icons/ClosePostNav.svelte";
  import { pokeTrapper } from "@utils/pokeTrapper.js";
  import ListIcon from "~icons/gg/list";

  export let contents,
    categories,
    related,
    pathname,
    mini = false;

  let { categoryClick, relatedClick } = pokeTrapper;
</script>

<nav class="page-navigation" class:mini>
  {#if mini}
    <input
      type="checkbox"
      name="page-navigation-checkbox"
      id="page-navigation-checkbox"
      tabindex="-1"
    />
    <label for="page-navigation-checkbox" class="page-navigation-toggle">
      <ListIcon class="page-navigation-open" />
      <ClosePostNav />
    </label>
  {/if}
  <div class="page-navigation-list">
    {#if contents}
      <h2>Table of Contents</h2>
      <TableOfContents {contents} />
    {/if}
    {#if categories}
      <h2>Categories</h2>
      <ul class="page-navigation-list">
        {#each categories as { attributes: { name, slug } }, i}
          <li>
            <a
              on:click={() => categoryClick(pathname, name)}
              href="/posts/category/{slug}/"
              class="transition-link">{name}</a
            >
          </li>
        {/each}
      </ul>
    {/if}
    {#if related}
      <h2>Related Posts</h2>
      <ul class="page-navigation-list">
        {#each related as { attributes: { title, slug } }, i}
          <li>
            <a
              on:click={() => relatedClick(pathname, title)}
              href="/post/{slug}/"
              class="transition-link">{title}</a
            >
          </li>
        {/each}
      </ul>
    {/if}
    {#if mini}
      <label
        for="page-navigation-checkbox"
        class="page-navigation-toggle bottom"
      >
        <ListIcon class="page-navigation-open" />
        <ClosePostNav />
      </label>
    {/if}
  </div>
</nav>
