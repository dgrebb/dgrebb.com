<script>
  import ScrollTop from '$lib/layout/ScrollTop.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Popover from '@components/general/Popover.svelte';
  import Post from '@components/posts/Post.svelte';
  import { popover } from '@store';
  import '@styles/pages/post.css';
  import { onMount } from 'svelte';

  export let data;

  $: ({
    pathname,
    post,
    toc,
    summary,
    content,
    post: { title, slug },
    pageMeta,
  } = data);
  $: hero = post.hero?.data?.attributes || false;
  $: heroThumb = hero?.formats?.thumbnail?.url
    ? hero.formats.thumbnail.url
    : false;
  $: heroImage = hero?.url ? hero.url : false;
  $: heroAlt = hero?.alternativeText ? hero.alternativeText : false;
  $: heroMime = hero?.mime;
  $: position = post.position || 'center center';
  $: ({ publishedAt, updatedAt } = post);
  $: footnotes = post.footnotes.length ? post.footnotes : false;
  $: related = post.related?.data || false;
  $: categories = post.categories?.data || false;

  let loaded = false;

  onMount(() => {
    if (heroImage) {
      const img = new Image();
      img.src = heroImage;

      img.onload = () => {
        loaded = true;
      };
    }
  });
</script>

<PageTransition transitionKey={pathname}>
  <section class="post meat">
    <span class="flourish" />
    <Post
      {publishedAt}
      {updatedAt}
      {slug}
      {title}
      {toc}
      {summary}
      {content}
      {footnotes}
      {categories}
      {related}
      {pathname}
      {heroImage}
      {heroMime}
      {loaded}
      {position}
      {heroThumb}
      {heroAlt}
    />
  </section>

  <slot name="scroll-top">
    <ScrollTop />
  </slot>

  {#if $popover.show}
    <Popover {...$popover} />
  {/if}
</PageTransition>

{#key pathname}
  <Meta {pageMeta} />
{/key}
