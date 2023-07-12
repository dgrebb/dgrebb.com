<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import { plausibleClicks } from "$lib/clicktracking.js";
  import slugger from "slugger";
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import PageTransition from "../../../components/PageTransition.svelte";
  import Code from "../../../components/content/Code.svelte";
  import TableOfContents from "../../../components/content/TableOfContents.svelte";
  import Link from "../../../components/content/renderers/Link.svelte";
  import PostHeading from "../../../components/content/renderers/PostHeading.svelte";
  import Flourish from "../../../layout/Flourish.svelte";

  export let data;

  let toc;
  $: if (data) toc = [];
  function filterTokens(event) {
    const tokens = event.detail.tokens;
    const headings = tokens.filter((t) => t.type === "heading");
    toc = [
      ...toc,
      ...headings.map((h) => ({
        text: h.text,
        link: `#${slugger(h.text)}`,
      })),
    ];
  }

  function handleParsed(event) {
    filterTokens(event);
  }

  $: ({
    pathname,
    post,
    post: { title },
  } = data);
  $: hero = post.hero?.data?.attributes || false;
  $: heroThumb = hero?.formats?.thumbnail?.url
    ? M + hero.formats.thumbnail.url
    : false;
  $: heroImage = hero?.url ? M + hero.url : false;
  $: position = post.position || "center center";
  $: blurhash = hero.blurhash || false;
  $: description = post.description || false;
  $: content = post.content.length ? post.content : false;
  $: seo = post.seo || false;
  $: contents = [...toc];
  $: related = post.related?.data || false;
  $: categories = post.categories?.data || false;

  let loaded = false;
  let failed = false;
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

  let { categoryClick, relatedClick } = plausibleClicks;
</script>

<PageTransition {pathname}>
  <section class="post-header {heroImage ? 'show' : 'hide'}">
    <Flourish />
    <a id="main">Main Content</a>
    {#if heroImage}
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
    {/if}
    <h1 class="post-title">{title}</h1>
  </section>
  <section class="post-main">
    <article class="post-article">
      {#if content.length}
        {#each content as c}
          {#if c.__component === "posts.text"}
            <SvelteMarkdown
              source={c.text}
              renderers={{ link: Link, heading: PostHeading }}
              on:parsed={handleParsed}
            />
          {/if}
          {#if c.__component === "posts.code"}
            <Code text={c.code} lang={c.language} title={c?.title} />
          {/if}
        {/each}
      {/if}
    </article>
    <aside class="post-aside">
      {#if contents.length}
        <h2>Table of Contents</h2>
        <TableOfContents {contents} />
      {/if}
      {#if categories.length}
        <h2>Categories</h2>
        <ul>
          {#each categories as { attributes: { name, slug } }, i}
            <li>
              <a
                on:click={() => categoryClick(pathname, name)}
                href="/posts/category/{slug}">{name}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
      {#if related.length}
        <h2>Related Posts</h2>
        <ul>
          {#each related as { attributes: { title, slug } }, i}
            <li>
              <a
                on:click={() => relatedClick(pathname, title)}
                href="/post/{slug}">{title}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
    </aside>
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
