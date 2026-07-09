<script>
  /**
   * Footnotes component to render a list of footnotes.
   * @component
   * @param {Array} footnotes - An array of footnote objects.
   */
  let { footnotes } = $props();
</script>

<h2 class="footnotes-title">Footnotes</h2>
<ul class="footnotes">
  {#each footnotes as { link, title, linkTitle }}
    <li class="note">
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
        title={linkTitle}
      >
        {title}
      </a>
    </li>
  {/each}
</ul>
