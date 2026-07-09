<script>
  import PostsGridItem from './PostsGridItem.svelte';

  import '@styles/components/posts-grid.css';
  let { gridItems } = $props();
</script>

<ul class="posts-grid">
  {#each gridItems as gridItem}
    <PostsGridItem {...gridItem} />
  {/each}
</ul>
