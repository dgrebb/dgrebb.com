<script>
  import TableOfContents from '@components/content/TableOfContents.svelte';
  import ClosePostNav from '@components/icons/ClosePostNav.svelte';
  import { categoryClick, relatedClick } from '@utils/uiHelpers.js';
  import ListIcon from '~icons/gg/list';

  export let contents,
    categories,
    related,
    pathname,
    mini = false;
</script>

<nav class="post-navigation" class:mini>
  {#if mini}
    <input
      type="checkbox"
      name="post-navigation-checkbox"
      id="post-navigation-checkbox"
      tabindex="-1"
    />
    <label for="post-navigation-checkbox" class="post-navigation-toggle">
      <ListIcon class="post-navigation-open" />
      <ClosePostNav />
    </label>
  {/if}
  <div class="post-navigation-list">
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
              href="/posts/category/{slug}/"
              class="transition-link">{name}</a
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
        for="post-navigation-checkbox"
        class="post-navigation-toggle bottom"
      >
        <ListIcon class="post-navigation-open" />
        <ClosePostNav />
      </label>
    {/if}
  </div>
</nav>
