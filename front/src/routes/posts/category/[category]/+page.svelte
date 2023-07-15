<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import SvelteMarkdown from "svelte-markdown";
  import Link from "@components/content/renderers/Link.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import Flourish from "@layout/Flourish.svelte";

  export let data;
  let mounted = false;
  const {
    content: { name, description, seo },
    posts,
    pathname,
  } = data;
</script>

<PageTransition {pathname}>
  <section class="category">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>{name}</h1>
    {#if description}
      <SvelteMarkdown renderers={{ link: Link }} source={description} />
    {/if}
    <ul class="posts-list">
      {#each posts as { attributes: { title, slug, summary, hero: { alternativeText, data: { attributes: { formats: { thumbnail, small, medium } } } } } }, i}
        <a href="/post/{slug}">
          <h2>{title}</h2>
          <img src={M + thumbnail?.url} alt={alternativeText} />
        </a>
        {#if summary}
          <SvelteMarkdown renderers={{ link: Link }} source={summary} />
        {/if}
      {/each}
    </ul>
  </section>
</PageTransition>
