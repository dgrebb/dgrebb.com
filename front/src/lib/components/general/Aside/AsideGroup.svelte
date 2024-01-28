<script>
  export let collection, title, items, singleton;
</script>

<h2>{title}</h2>
<ul class="{collection}__{title}">
  {#each items as { attributes: { name, slug } }}
    <li><a href="/cv/{singleton}/{slug}">{name}</a></li>
  {/each}
</ul>

<style>
  /* your styles go here */
</style>
