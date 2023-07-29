<script>
  export let footnotes;
</script>

<h2 class="footnotes-title">Footnotes</h2>
<ul class="footnotes">
  {#each footnotes as { link, title }, i}
    <li class="note"><a href={link} rel="noopener noreferrer" target="_blank">{title}</a></li>
  {/each}
</ul>
