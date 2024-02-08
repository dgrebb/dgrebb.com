<script>
  import './article.css';
</script>

<div class="article">
  <article>
    <slot name="header" />
    <slot name="aside" />
    <slot name="content" />
  </article>
</div>
