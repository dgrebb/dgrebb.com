<script>
  let {
    text,
    citation = false,
    citationLink = false,
    citationLinkTitle,
  } = $props();
</script>

<blockquote>
  <p>{text}</p>
  {#if citation}
    <footer>
      <cite>
        {#if citationLink}
          &mdash;<a
            href={citationLink}
            title={citationLinkTitle}
            target="_blank"
            rel="nofollow noopener noreferrer">{citation}</a
          >
        {:else}
          &mdash;{citation}
        {/if}
      </cite>
    </footer>
  {/if}
</blockquote>
