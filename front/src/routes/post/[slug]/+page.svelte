<script>
  import PageTransition from "@components/PageTransition.svelte";
  import Post from "@components/posts/Post.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import Meta from "@components/Meta.svelte";
  import { onMount } from "svelte";

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
  $: position = post.position || "center center";
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
    <Post {title} {summary} {content} {footnotes} {categories} {related} {pathname} />
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