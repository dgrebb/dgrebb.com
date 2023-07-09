<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import SvelteMarkdown from "svelte-markdown";
  import PageTransition from "../../../components/PageTransition.svelte";
  import Code from "../../../components/content/Code.svelte";
  import TableOfContents from "../../../components/content/TableOfContents.svelte";
  import PostHeading from "../../../components/content/renderers/PostHeading.svelte";
  import Link from "../../../components/content/renderers/Link.svelte";
  import Flourish from "../../../layout/Flourish.svelte";
  import slugger from "slugger";

  export let data;

  let toc = [];
  function filterTokens(event) {
    const tokens = event.detail.tokens;
    const headings = tokens.filter((t) => t.type === "heading");
    headings.map((h) => {
      toc = [
        ...toc,
        {
          text: h.text,
          link: `#${slugger(h.text)}`,
        },
      ];
    });
  }

  function handleParsed(event) {
    filterTokens(event);
  }

  $: ({ pathname, post } = data);
  $: ({ title } = post);
  $: hero = post.hero?.data?.attributes || false;
  $: heroImage = hero?.formats?.large?.url
    ? `${PUBLIC_MEDIA_URL}${hero.formats.large.url}`
    : false;
  $: position = post.position || "center center";
  $: blurhash = hero.blurhash || false;
  $: description = post.description || false;
  $: content = post.content.length ? post.content : false;
  $: seo = post.seo || false;
  $: contents = [...toc];
  $: related = post.related?.data || false;
  $: categories = post.categories?.data || false;
</script>

<PageTransition {pathname}>
  <section class="post-header">
    <Flourish />
    <a id="main">Main Content</a>
    {#if heroImage}
      <div
        class="hero image-bottom"
        style={heroImage
          ? `background-image: url('${heroImage}'); background-position: ${position};`
          : false}
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
          {#each categories as category}
            <li>
              <a href="/posts/category/{category.attributes.slug}"
                >{category.attributes.name}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
      {#if related.length}
        <h2>Related Posts</h2>
        <ul>
          {#each related as post}
            <li>
              <a href="/post/{post.attributes.slug}">{post.attributes.title}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </aside>
  </section>
</PageTransition>
