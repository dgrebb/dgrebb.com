<script>
  import PageNav from '@components/general/PageNav.svelte';
  import AnimatedImage from '@components/content/AnimatedImage.svelte';
  import Code from '@components/content/Code.svelte';
  import Footnotes from '@components/content/renderers/Footnotes.svelte';

  export let publishedAt,
    updatedAt,
    slug,
    title,
    toc,
    summary,
    content,
    footnotes,
    categories,
    related,
    pathname;

  const pub = new Date(publishedAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const up = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    : false;

  $: showAside = true;
  // eslint-disable-next-line no-unused-vars
  $: asideLabel = showAside ? 'Hide' : 'Show';
  // eslint-disable-next-line no-unused-vars
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

<svelte:head>
  <meta name="date" content={publishedAt} />
  {#if updatedAt}<meta name="date_modified" content={updatedAt} />{/if}
</svelte:head>

{#if (toc && toc.length) || (categories && categories.length) || (related && related.length)}
  <PageNav {toc} {categories} {related} {pathname} mini {setActiveLink} />
{/if}
<h1 class="post-title">{title}</h1>
<article class="post-article" class:full={!showAside}>
  <time
    class="pubdate"
    datetime={publishedAt}
    title={updatedAt ? `Updated ${up}` : false}>{pub}</time
  >
  {#if summary}
    <div class="summary">
      {@html summary}
    </div>
  {/if}
  {#if content}
    {#each content as c, i}
      {#if c.__component === 'posts.text'}
        {@html c.text}
      {/if}
      {#if c.__component === 'posts.quote'}
        <blockquote>
          <p>{c.text}</p>
          {#if c.citation}
            <footer>
              <cite>
                {#if c.citationLink}
                  &mdash;<a
                    href={c.citationLink}
                    title={c.citationLinkTitle}
                    target="_blank"
                    rel="nofollow noopener noreferrer">{c.citation}</a
                  >
                {:else}
                  &mdash;{c.citation}
                {/if}
              </cite>
            </footer>
          {/if}
        </blockquote>
      {/if}
      {#if c.__component === 'posts.code'}
        {@const lines =
          c?.highlightedLines?.split(',').map((item) => Number(item - 1)) ||
          false}
        <Code
          key={i}
          pageTitle={title}
          pageSlug={slug}
          text={c.code}
          lang={c.syntax}
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
      {#if c.__component === 'posts.animated-image'}
        {@const {
          animation: {
            data: {
              attributes: {
                url: animation,
                width,
                height,
                alternativeText: aAlt,
              },
            },
          },
          still: {
            data: {
              attributes: { url: still, alternativeText: sAlt },
            },
          },
          figcaption,
        } = c}
        <AnimatedImage
          {animation}
          {width}
          {height}
          {aAlt}
          {still}
          {sAlt}
          {figcaption}
        />
      {/if}
      {#if c.__component === 'posts.columns'}
        {@const cols = c.columns}
        {@const count = cols.length}
        <h2>{count}</h2>
        <section class="text-columns">
          {#each cols as { heading, text }}
            <div class="text-column" class:headless={!heading}>
              {#if heading !== null}<header>{heading}</header>{/if}
              {@html text}
            </div>
          {/each}
        </section>
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
<aside class="aside" class:show={showAside}>
  {#if (toc && toc.length) || (categories && categories.length) || (related && related.length)}
    <PageNav {toc} {categories} {related} {pathname} {setActiveLink} />
  {/if}
</aside>
