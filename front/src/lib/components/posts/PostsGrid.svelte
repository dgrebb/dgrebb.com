<script>
  import '@styles/components/posts-grid.css';
  export let gridItems;
</script>

<ul class="posts-grid">
  {#each gridItems as { lazyImage, slug, title }, i (slug)}
    <li
      class="post-item"
      style={lazyImage && `background-image: url('${lazyImage}');`}
    >
      <a href="/post/{slug}/" class="post-link">
        <span class="link-bg">{title}</span>
      </a>
    </li>
  {/each}
</ul>
