<script>
  import ScrollTop from '$lib/layout/ScrollTop.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Popover from '@components/general/Popover.svelte';
  import Post from '@components/posts/Post.svelte';
  import { popover } from '@store';
  import '@styles/pages/post.css';
  import { onMount } from 'svelte';

  let { data } = $props();

  let pathname = $derived(data.pathname);
  let post = $derived(data.post);
  let toc = $derived(data.toc);
  let summary = $derived(data.summary);
  let content = $derived(data.content);
  let title = $derived(data.post.title);
  let slug = $derived(data.post.slug);
  let pageMeta = $derived(data.pageMeta);
  let hero = $derived(post.hero?.data?.attributes || false);
  let heroThumb = $derived(
    hero?.formats?.thumbnail?.url ? hero.formats.thumbnail.url : false
  );
  let heroImage = $derived(hero?.url ? hero.url : false);
  let heroAlt = $derived(hero?.alternativeText ? hero.alternativeText : false);
  let heroMime = $derived(hero?.mime);
  let position = $derived(post.position || 'center center');
  let publishedAt = $derived(post.publishedAt);
  let updatedAt = $derived(post.updatedAt);
  let footnotes = $derived(post.footnotes.length ? post.footnotes : false);
  let related = $derived(post.related?.data || false);
  let categories = $derived(post.categories?.data || false);

  let loaded = $state(false);

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
