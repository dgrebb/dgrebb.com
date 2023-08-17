<script>
  import { onMount } from 'svelte';
  import Code from '@components/content/Code.svelte';
  import Footnotes from '@components/content/renderers/Footnotes.svelte';
  import Link from '@components/content/renderers/Link.svelte';
  import PostHeading from '@components/content/renderers/PostHeading.svelte';
  import PageNav from '@components/PageNav.svelte';
  import slugger from 'slugger';
  import SvelteMarkdown from 'svelte-markdown';

  export let title;
  export let summary;
  export let content;
  export let footnotes;
  export let categories;
  export let related;
  export let pathname;

  let toc, postNavCheckbox, miniPostNav;
  $: toc = [];
  function filterTokens(event) {
    const tokens = event.detail.tokens;
    const headings = tokens.filter((t) => t.type === 'heading');
    toc = [
      ...toc,
      ...headings.map((h) => ({
        text: h.text,
        link: `#${slugger(h.text)}`,
      })),
    ];
  }

  function handleParsed(event) {
    filterTokens(event);
  }

  $: contents = toc ? [...toc] : false;

  $: showAside = true;
  $: asideLabel = showAside ? 'Hide' : 'Show';
  function asideToggle() {
    showAside = !showAside;
  }

  const setActiveLink = (e) => {
    const links = e.target.closest('ul').querySelectorAll('a');
    links.forEach((link) => {
      link.classList.toggle('active', false);
    });
    e.target.classList.toggle('active', true);
  };
</script>

{#if (contents && contents.length) || (categories && categories.length) || (related && related.length)}
  <PageNav {contents} {categories} {related} {pathname} mini {setActiveLink} />
{/if}
<h1 class="post-title">{title}</h1>
<article class="post-article" class:full={!showAside}>
  {#if summary}
    <p class="summary">{summary}</p>
  {/if}
  {#if content}
    {#each content as c, i}
      {#if c.__component === 'posts.text'}
        <SvelteMarkdown
          source={c.text}
          renderers={{ link: Link, heading: PostHeading }}
          on:parsed={handleParsed}
        />
      {/if}
      {#if c.__component === 'posts.code'}
        {@const lines =
          c?.highlightedLines?.split(',').map((item) => Number(item - 1)) ||
          false}
        <Code
          key={i}
          text={c.code}
          lang={c.language}
          title={c?.title}
          lineNumbers={c.showLineNumbers === true || lines.length > 0}
          copyButton={c?.showCopyButton === true}
          highlightedLines={lines
            ? lines.sort((a, b) => {
                return a - b;
              })
            : false}
        />
      {/if}
      {#if c.__component === 'posts.html'}
        <div class="inline-html">
          {@html c.html}
        </div>
      {/if}
    {/each}
  {/if}
  {#if footnotes}
    <footer class="footnotes-footer">
      <Footnotes {footnotes} />
    </footer>
  {/if}
</article>

<!-- <button on:click={asideToggle} class="aside-toggle"
  >{asideLabel} Sidebar</button
> -->
<aside class="post-aside" class:show={showAside}>
  {#if (contents && contents.length) || (categories && categories.length) || (related && related.length)}
    <PageNav {contents} {categories} {related} {pathname} {setActiveLink} />
  {/if}
</aside>
