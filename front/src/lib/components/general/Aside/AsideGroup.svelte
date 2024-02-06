<script>
  export let collection, title, items, singleton;
</script>

<h2>{title}</h2>
<ul class="{collection}__{title} page-navigation-list">
  {#each items as { attributes: { name, slug } }}
    <li><a href="/cv/{singleton}/{slug}">{name}</a></li>
  {/each}
</ul>

<style lang="postcss">
  .page-navigation-list {
    & a {
      color: var(--link-clr);
      &:hover,
      &:focus,
      &:focus-visible {
        color: var(--link-clr--hover);
      }
    }
  }
</style>
