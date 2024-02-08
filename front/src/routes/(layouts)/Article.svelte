<script>
  import './article.css';
</script>

<div class="article">
  <slot name="header" />
  <article>
    <slot name="aside" />
    <slot name="content" />
  </article>
</div>
