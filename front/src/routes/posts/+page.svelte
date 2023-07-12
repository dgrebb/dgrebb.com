<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import Head from "../../components/Head.svelte";
  import PageTransition from "../../components/PageTransition.svelte";
  import Link from "../../components/content/renderers/Link.svelte";
  import Flourish from "../../layout/Flourish.svelte";

  export let data;
  let mounted = false;
  const { pathname, page, page: { headline, description }, posts } = data;
  let seo = page?.seo;
  const gridItems = posts.map(({ attributes: post }) => {
    const { title, slug, hero } = post;
    const heroImages = hero?.data?.attributes;
    const full = heroImages?.url || false;
    const thumbnail = heroImages?.formats?.thumbnail?.url || false;
    const image = full ? M + full : false;
    const lazyImage = thumbnail ? M + thumbnail : false;

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

<PageTransition {pathname}>
  <section class="posts">
    <Flourish />
    <a id="main">Main Content</a>
    <h1 class="title">{headline}</h1>
    <div class="summary">
      <SvelteMarkdown renderers={{ link: Link }} source={description} />
    </div>
    <ul class="posts-grid">
      {#each gridItems as { lazyImage, slug, title }, i (slug)}
        <li
          class="post-item"
          style={lazyImage && `background-image: url('${lazyImage}');`}
        >
          <a href={`/post/${slug}`} class="post-link">
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</PageTransition>
<Head>
  {#if mounted}
    {#each gridItems as { image }}
      {#if image}
        <link rel="preload" as="image" href={image} />
      {/if}
    {/each}
  {/if}
</Head>