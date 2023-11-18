<script>
  import ScrollTop from '$lib/layout/ScrollTop.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Post from '@components/posts/Post.svelte';
  import PostHero from '@components/posts/PostHero.svelte';
  import Flourish from '@layout/Flourish.svelte';
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
  $: heroMime = hero?.mime;
  $: position = post.position || 'center center';
  $: ({ publishedAt, updatedAt } = post);
  $: footnotes = post.footnotes.length ? post.footnotes : false;
  $: related = post.related?.data || false;
  $: categories = post.categories?.data || false;

  let loaded,
    failed = false;
  let loading = true;

  onMount(() => {
    if (heroImage) {
      const img = new Image();
      img.src = heroImage;
      loading = true;

      img.onload = () => {
        loading = false;
        loaded = true;
      };
      img.onerror = () => {
        loading = false;
        failed = true;
      };
    }
  });
</script>

<PageTransition transitionKey={pathname}>
  <section class="post meat">
    <Flourish />
    {#if heroImage}
      <PostHero {heroImage} {heroMime} {loaded} {position} {heroThumb} />
    {/if}
    <a id="main">Main Content</a>
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
    />
  </section>

  <slot name="scroll-top">
    <ScrollTop />
  </slot>
</PageTransition>

{#key pathname}
  <Meta {pageMeta} />
{/key}
