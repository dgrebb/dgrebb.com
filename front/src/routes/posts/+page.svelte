<script>
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import PostsGrid from '@components/posts/PostsGrid.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/posts.css';
  import { onMount } from 'svelte';

  export let data;
  let mounted = false;
  const {
    pathname,
    page: { headline, description },
    posts,
    pageMeta,
  } = data;

  const gridItems = posts.map(({ attributes: post }) => {
    const { title, slug, hero, seo } = post;
    const heroImages = hero?.data?.attributes;
    const full = heroImages?.url || false;
    const thumbnail = heroImages?.formats?.thumbnail?.url || false;
    const image = full ? full : false;
    const lazyImage = thumbnail ? thumbnail : false;

    return {
      title,
      slug,
      seo,
      image,
      lazyImage,
    };
  });

  onMount(() => {
    mounted = true;
  });
</script>

<PageTransition transitionKey={pathname}>
  <section class="posts">
    <Flourish />
    <a id="main">Main Content</a>
    <h1 class="title">{headline}</h1>
    <div class="summary">
      {@html description}
    </div>
    <PostsGrid {gridItems} />
  </section>
</PageTransition>

<!-- <Head>
  {#if mounted}
    {#each gridItems as { image }}
      {#if image}
        <link
          rel="prefetch"
          href={image}
          as="image"
          fetchPriority="low"
          crossorigin
        />
      {/if}
    {/each}
  {/if}
</Head> -->

<Meta {pageMeta} />
