<script>
  import ScrollTop from '$lib/layout/ScrollTop.svelte';
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Post from '@components/posts/Post.svelte';
  import PostHero from '@components/posts/PostHero.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import { onMount } from 'svelte';

  export let data;

  $: ({
    pathname,
    post,
    post: { title },
    pageMeta,
  } = data);
  $: hero = post.hero?.data?.attributes || false;
  $: heroThumb = hero?.formats?.thumbnail?.url
    ? hero.formats.thumbnail.url
    : false;
  $: heroImage = hero?.url ? hero.url : false;
  $: position = post.position || 'center center';
  $: summary = post.summary || false;
  $: content = post?.content?.length ? post.content : false;
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
  <section class="post">
    <Flourish />
    {#if heroImage}
      <PostHero {heroImage} {loaded} {position} {heroThumb} />
    {/if}
    <a id="main">Main Content</a>
    <Post
      {title}
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

{#if failed}
  <script>
    Sentry.captureMessage("Image Not Found", {
      image: src,
      page: document.location.pathname,
      { hostname }: document.location,
    });
  </script>
{/if}

{#key pathname}
  <Meta {pageMeta} />
{/key}
