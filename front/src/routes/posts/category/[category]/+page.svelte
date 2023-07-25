<script>
  import { page } from "$app/stores";
  import SvelteMarkdown from "svelte-markdown";
  import Link from "@components/content/renderers/Link.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import SamePageTransition from "@components/SamePageTransition.svelte";
  import Meta from "@components/Meta.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import CategoryAside from "@components/CategoryAside.svelte";

  export let data;
  const route = $page.route.id;
  $: ({
    content: { name, description },
    categories,
    posts,
    pageMeta,
    pathname,
  } = data);
</script>

<PageTransition transitionKey={route}>
  <section class="category">
    <div class="category-summary">
      <SamePageTransition transitionKey={pathname}>
        <a id="main">Main Content</a>
        <h1 class="category-name">{name}</h1>
        {#if description}
          <SvelteMarkdown renderers={{ link: Link }} source={description} />
        {/if}
      </SamePageTransition>
    </div>
    <div class="category-posts-list">
      <Flourish />
      {#if posts}
        <ul>
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
    </div>
    <CategoryAside {categories} />
  </section>
</PageTransition>
<Meta {pageMeta} />
