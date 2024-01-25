<script>
  export let text;
  export let citation = false;
  export let citationLink = false;
  export let citationLinkTitle;
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
