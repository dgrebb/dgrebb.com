<script>
  import './article.css';
  let { header, aside, content } = $props();
</script>

<article class="article">
  {@render header?.()}
  {@render aside?.()}
  {@render content?.()}
</article>
