<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import SvelteMarkdown from "svelte-markdown";
  import Code from "../../../components/markdown/Code.svelte";
  import PageTransition from "../../../components/PageTransition.svelte";
  import Code from "../../../components/content/Code.svelte";
  import Link from "../../../components/content/renderers/Link.svelte";
  import Flourish from "../../../layout/Flourish.svelte";

  export let data;

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
            <SvelteMarkdown source={c.text} renderers={{ link: Link }} />
          {/if}
          {#if c.__component === "posts.code"}
            <Code text={c.code} lang={c.language} title={c?.title} />
          {/if}
        {/each}
      {/if}
    </article>
    <aside class="post-aside">
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
      <h2>Related Posts</h2>
      <ul>
        {#each related as post}
          <li>
            <a href="/post/{post.attributes.slug}">{post.attributes.title}</a>
          </li>
        {/each}
      </ul>
    </aside>
  </section>
</PageTransition>
