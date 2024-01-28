<script>
  import TableOfContents from '@components/posts/TableOfContents.svelte';
  import ClosePageNav from '@components/general/PageNav/ClosePageNav.svelte';
  import { categoryClick, relatedClick } from '@utils/uiHelpers.js';
  import { focusTrap } from '@utils/actions.js';
  import ListIcon from '~icons/gg/list';
  import './page-nav.css';

  export let toc = false;
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

  function pageFenceClickHandler() {
    const pageNavCheckbox = document.getElementById('page-navigation-checkbox');
    pageNavCheckbox.checked = false;
  }
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<nav class="page-navigation" class:mini class:top role="navigation">
  {#if mini}
    <input
      type="checkbox"
      name="page-navigation-checkbox"
      id="page-navigation-checkbox"
      aria-label="Toggle Page Navigation"
    />
    <label for="page-navigation-checkbox" class="page-navigation-toggle">
      <ListIcon class="page-navigation-open" />
      <ClosePageNav classList="page-navigation-close" />
    </label>
  {/if}
  <div class="page-navigation-list" use:focusTrap={mini}>
    {#if toc && toc.length > 0}
      <h2>Table of Contents</h2>
      <TableOfContents
        {toc}
        {pageFenceClickHandler}
        {setActiveLink}
        {activeLink}
      />
    {/if}
    {#if categories && categories.length}
      <h2>Categories</h2>
      <ul class="page-navigation-list">
        {#if !toc}
          <li class="page-navigation-category-all">
            <a
              on:click={(e) => {
                categoryClick(pathname, 'All Categories');
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
        {/if}
        {#each categories as { attributes: { name, slug } }}
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
        {#each related as { attributes: { title, slug } }}
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
