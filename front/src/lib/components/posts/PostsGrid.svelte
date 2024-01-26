<script>
  import PostsGridItem from './PostsGridItem.svelte';

  import '@styles/components/posts-grid.css';
  export let gridItems;
</script>

<ul class="posts-grid">
  {#each gridItems as gridItem}
    <PostsGridItem {...gridItem} />
  {/each}
</ul>
