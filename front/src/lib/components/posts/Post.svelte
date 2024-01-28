<script>
  import AnimatedImage from '@components/posts/AnimatedImage.svelte';
  import Code from '@components/posts/Code/Code.svelte';
  import Footnotes from '@components/posts/Footnotes.svelte';
  import PageNav from '@components/general/PageNav/PageNav.svelte';
  import PostText from '@components/posts/PostText.svelte';
  import BlockQuote from '@components/posts/BlockQuote.svelte';
  import { popImage } from '@utils/popoverHandlers';
  import { copyText } from '@utils';
  import { onMount } from 'svelte';

  /**
   * Props for the blog post component.
   * @typedef {Object} BlogPostProps
   * @property {string} publishedAt - The publication date.
   * @property {string} updatedAt - The last update date.
   * @property {string} slug - The post slug.
   * @property {string} title - The post title.
   * @property {Array} toc - Table of Contents.
   * @property {string} summary - The post summary.
   * @property {Array} content - The main content of the post.
   * @property {Array} footnotes - Footnotes for the post.
   * @property {Array} categories - Categories associated with the post.
   * @property {Array} related - Related posts.
   * @property {string} pathname - The current path.
   */

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

  /**
   * Sets the active link in the page navigation.
   * @param {Event} e - The click event.
   */
  const setActiveLink = function (e) {
    const links = e.target.closest('ul').querySelectorAll('a');
    links.forEach((link) => {
      link.classList.toggle('active', false);
    });
    e.target.classList.toggle('active', true);
  };

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

  onMount(function () {
    const codes = document.querySelectorAll('.post-article p > code');
    const popoverImages = document.querySelectorAll('.popover--image');

    codes.forEach(function (code) {
      code.addEventListener('click', (e) => copyText(e));
    });

    popoverImages.forEach(function (image) {
      image.addEventListener('click', (e) => popImage(e, slug));
    });
  });

  const components = {
    'posts.text': PostText,
    'posts.quote': BlockQuote,
    'posts.code': Code,
    'posts.animated-image': AnimatedImage,
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
<div class="post-layout">
  <aside class="aside" role="navigation">
    {#if (toc && toc.length) || (categories && categories.length) || (related && related.length)}
      <PageNav {toc} {categories} {related} {pathname} {setActiveLink} />
    {/if}
  </aside>
  <article class="post-article">
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
      {#each content as c, key}
        <svelte:component
          this={components[c.__component]}
          {...c}
          {key}
          pageTitle={title}
          {slug}
        />
        <!-- TODO: Remove these fields and components
          if not in use by 24.04.01
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
        -->
      {/each}
    {/if}
    {#if footnotes}
      <footer class="footnotes-footer">
        <Footnotes {footnotes} />
      </footer>
    {/if}
  </article>
</div>
