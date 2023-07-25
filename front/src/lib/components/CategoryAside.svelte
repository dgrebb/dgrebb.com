<script>
  
  export let categories;
</script>

<aside class="category-aside">
  <h1>Categories</h1>
  <ul>
    {#each categories as { attributes: { name, slug } }}
      <li><a href="/posts/category/{slug}">{name}</a></li>
    {/each}
  </ul>
</aside>
