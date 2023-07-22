<script>
  import SvelteMarkdown from "svelte-markdown";
  import Link from "@components/content/renderers/Link.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import Meta from "@components/Meta.svelte";
  import Flourish from "@layout/Flourish.svelte";

  export let data;
  let mounted = false;
  $: ({
    content: { name, description },
    posts,
    pageMeta,
    pathname,
  } = data);
</script>

<PageTransition {pathname}>
  <section class="category">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>{name}</h1>
    {#if description}
      <SvelteMarkdown renderers={{ link: Link }} source={description} />
    {/if}
    {#if posts}
      <ul class="posts-list">
        {#each posts as { attributes: { title, slug, summary, hero: { alternativeText, data: { attributes: { formats: { thumbnail, small, medium } } } } } }, i}
          <a href="/post/{slug}">
            <h2>{title}</h2>
            <img src={thumbnail?.url} alt={alternativeText} />
          </a>
          {#if summary}
            <SvelteMarkdown renderers={{ link: Link }} source={summary} />
          {/if}
        {/each}
      </ul>
    {:else}
      <h2>There aren't any posts yet! Come back soon.</h2>
    {/if}
  </section>
</PageTransition>

<Meta {pageMeta} />
