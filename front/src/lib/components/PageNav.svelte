<script>
  import { onMount } from "svelte";
  import TableOfContents from "@components/content/TableOfContents.svelte";
  import ClosePageNav from "@components/icons/ClosePageNav.svelte";
  import { pokeTrapper } from "@utils/pokeTrapper.js";
  import ListIcon from "~icons/gg/list";

  export let contents = false;
  export let categories = false;
  export let related = false;
  export let pathname = false;
  export let mini = false;
  export let top = false;
  export let toggleHandler = null;

  let toc, pageNavCheckbox, miniPageNav;
  let { categoryClick, relatedClick } = pokeTrapper;

  function activeLink(node) {
    const link = node.attributes.href.value;
    if (link === pathname) node.classList.add("active");
  };

  function pageFenceClickHandler(e) {
    const pageNavCheckbox = document.getElementById("page-navigation-checkbox");
    pageNavCheckbox.checked = false;
  }

</script>

<nav class="page-navigation" class:mini class:top>
  {#if mini}
    <input
      type="checkbox"
      name="page-navigation-checkbox"
      id="page-navigation-checkbox"
      tabindex="-1"
    />
    <label for="page-navigation-checkbox" class="page-navigation-toggle">
      <ListIcon class="page-navigation-open" />
      <ClosePageNav classList="page-navigation-close" />
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
              class="transition-link"
              use:activeLink
              on:click={toggleHandler}
            >
              {name}
            </a>
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
        <ClosePageNav classList="page-navigation-close" />
      </label>
    {/if}
  </div>
  <div class="page-fence" on:click={pageFenceClickHandler} on:keydown={pageFenceClickHandler}></div>
</nav>
