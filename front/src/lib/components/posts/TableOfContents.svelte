<script>
  import { tocClick } from '@utils/uiHelpers.js';
  
  let { toc, pageFenceClickHandler = null, activeLink = null, setActiveLink = null } = $props();

  const TOCAnchorFocus = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      const anchor = e.target.getAttribute('href');
      const focusTarget = document.querySelector(
        `.post-article a[href="${anchor}"]`
      );
      e.preventDefault();
      pageFenceClickHandler(e);
      focusTarget.focus();
    } else {
      return;
    }
  };
</script>

<ul class="toc">
  {#each toc as { text, link }}
    <li>
      <a
        class="toc-link"
        onclick={(e) => {
          tocClick(text);
          setActiveLink(e);
          pageFenceClickHandler(e);
        }}
        href={link}
        data-sveltekit-replacestate
        data-sveltekit-noscroll="false"
        use:activeLink
        onkeydown={(e) => {
          TOCAnchorFocus(e);
        }}
      >
        {@html text}
      </a>
    </li>
  {/each}
</ul>
