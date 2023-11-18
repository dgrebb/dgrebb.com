<script>
  import { tocClick } from '@utils/uiHelpers.js';
  export let toc;
  export let pageFenceClickHandler = null;
  export let activeLink = null;
  export let setActiveLink = null;

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
  {#each toc as { text, link }, i}
    <li>
      <a
        class="toc-link"
        on:click={(e) => {
          tocClick(text);
          setActiveLink(e);
          pageFenceClickHandler(e);
        }}
        href={link}
        data-sveltekit-replacestate
        data-sveltekit-noscroll="false"
        use:activeLink
        on:keydown={(e) => {
          TOCAnchorFocus(e);
        }}
      >
        {@html text}
      </a>
    </li>
  {/each}
</ul>
