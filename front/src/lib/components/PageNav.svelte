<script>
  import { onMount } from 'svelte';
  import TableOfContents from '@components/content/TableOfContents.svelte';
  import ClosePageNav from '@components/icons/ClosePageNav.svelte';
  import { categoryClick, relatedClick } from '@utils/uiHelpers.js';
  import ListIcon from '~icons/gg/list';

  export let contents = false;
  export let categories = false;
  export let related = false;
  export let pathname = false;
  export let mini = false;
  export let top = false;
  export let setActiveLink = null;
  export let category = null;

  function activeLink(node) {
    const link = node.attributes.href.value;
    const hash = location.hash;
    if (link === pathname || link === hash) {
      node.classList.toggle('active', true);
    }
  }

  function pageFenceClickHandler(e) {
    const pageNavCheckbox = document.getElementById('page-navigation-checkbox');
    pageNavCheckbox.checked = false;
  }
</script>

<nav class="page-navigation" class:mini class:top>
  {#if mini}
    <input
      type="checkbox"
      name="page-navigation-checkbox"
      id="page-navigation-checkbox"
    />
    <label
      for="page-navigation-checkbox"
      class="page-navigation-toggle"
      aria-label="Show Page Navigation"
    >
      <ListIcon class="page-navigation-open" />
      <ClosePageNav classList="page-navigation-close" />
    </label>
  {/if}
  <div class="page-navigation-list">
    {#if contents && contents.length}
      <h2>Table of Contents</h2>
      <TableOfContents
        {contents}
        {pageFenceClickHandler}
        {setActiveLink}
        {activeLink}
      />
    {/if}
    {#if categories && categories.length}
      <h2>Categories</h2>
      <ul class="page-navigation-list">
        <li class="page-navigation-category-all">
          <a
            on:click={(e) => {
              categoryClick(pathname, name);
              setActiveLink(e);
              if (mini) pageFenceClickHandler();
            }}
            href="/posts/category/all/"
            class="transition-link"
            class:active={category === 'all'}
            use:activeLink
          >
            All
          </a>
        </li>
        {#each categories as { attributes: { name, slug } }, i}
          <li>
            <a
              on:click={(e) => {
                categoryClick(pathname, name);
                setActiveLink(e);
                if (mini) pageFenceClickHandler();
              }}
              href="/posts/category/{slug}/"
              class="transition-link"
              class:active={category === slug}
              use:activeLink
            >
              {name}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
    {#if related && related.length}
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
        <ClosePageNav classList="page-navigation-close" />
      </label>
    {/if}
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if mini}
    <div class="page-fence" on:click={pageFenceClickHandler}></div>
  {/if}
</nav>
