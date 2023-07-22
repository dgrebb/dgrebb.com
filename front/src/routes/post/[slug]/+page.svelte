<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import PageTransition from "@components/PageTransition.svelte";
  import Post from "@components/posts/Post.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import Meta from "@components/Meta.svelte";
  import { onMount } from "svelte";

  export let data;

  $: ({
    pathname,
    post,
    post: { title, createdAt, updatedAt, publishedAt },
  } = data);
  $: hero = post.hero?.data?.attributes || false;
  $: heroThumb = hero?.formats?.thumbnail?.url
    ? M + hero.formats.thumbnail.url
    : false;
  $: heroImage = hero?.url ? M + hero.url : false;
  $: position = post.position || "center center";
  $: description = post.description || false;
  $: content = post?.content?.length ? post.content : false;
  $: seo = post.seo || false;
  $: footnotes = post?.footnotes ? post.footnotes : false;
  $: related = post.related?.data || false;
  $: categories = post.categories?.data || false;

  let loaded,
    failed = false;
  let loading = true;

  $: pageMeta = {
    ...seo,
    type: "post",
    title,
    metaImage: heroImage,
    createdAt,
    updatedAt,
    publishedAt,
    titleTemplate: "%s | Writing | Dan Grebb",
  };
  
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

<PageTransition {pathname}>
  <section class="post">
    <Flourish />
    {#if heroImage}
      <div class="hero-wrap {heroImage ? 'show' : 'hide'}">
        {#if loaded}
          <div
            class="hero loaded"
            style={heroImage &&
              `background-image: url('${heroImage}'); background-position: ${position};`}
          />
        {/if}
        <div
          class="hero hero-thumbnail {loaded ? 'loaded' : null}"
          style={heroThumb &&
            `background-image: url('${heroThumb}'); background-position: ${position};`}
        />
      </div>
    {/if}
    <a id="main">Main Content</a>
    <Post {title} {content} {footnotes} {categories} {related} {pathname} />
  </section>
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

<Meta {pageMeta} />