<script>
  import { onMount } from "svelte";
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import Flourish from "../../layout/Flourish.svelte";
  import PageTransition from "../../components/PageTransition.svelte";
  import SvelteMarkdown from "svelte-markdown";
  import Link from "../../components/content/renderers/Link.svelte";

  export let data;
  let mounted = false;
  const { pathname } = data;
  let image,
    thumbnail,
    seo = false;
  const { headline, description } = data.postsPageContent;
  seo = data?.postsPageContent?.seo;
  const posts = [];

  data.posts.map((post) => {
    const { title, slug, hero } = post.attributes;

    const heroImages = hero?.data?.attributes;
    const full = heroImages?.url || false;
    const { thumbnail } = heroImages?.formats || false;
    const image = full ? `${PUBLIC_MEDIA_URL}${full.url}` : false;
    const lazyImage = thumbnail ? `${PUBLIC_MEDIA_URL}${thumbnail.url}` : false;

    posts.push({
      title,
      slug,
      seo,
      image,
      lazyImage,
    });
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
      {#each posts as post}
        <li
          class="post-item"
          style={post.lazyImage
            ? `background-image: url('${post.lazyImage}');`
            : null}
        >
          <a href={`/post/${post.slug}`} class="post-link">
            {post.title}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</PageTransition>

<svelte:head>
  {#if mounted}
    {#each posts as post}
      <link rel="preload" as="image" href={post.image} />
    {/each}
  {/if}
</svelte:head>
