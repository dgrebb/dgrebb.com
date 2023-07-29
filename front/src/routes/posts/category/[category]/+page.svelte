<script>
  import { page } from "$app/stores";
  import SvelteMarkdown from "svelte-markdown";
  import Link from "@components/content/renderers/Link.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import SamePageTransition from "@components/SamePageTransition.svelte";
  import Meta from "@components/Meta.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import PageNav from "../../../../lib/components/PageNav.svelte";

  export let data;
  const route = $page.route.id;
  $: ({
    content: { name },
    categories,
    posts,
    pageMeta,
    pathname,
  } = data);

  const activeHandler = (e) => {
    const links = e.target.closest("ul").querySelectorAll("a");
    const miniNav = document.getElementById("page-navigation-checkbox");
    links.forEach((link) => {
      link.classList.toggle("active", false);
    });
    e.target.classList.toggle("active", true);
  };
</script>

<PageTransition transitionKey={route}>
  <section class="category">
    <head class="category-head">
      <PageNav {categories} mini={true} top={true} {pathname} {activeHandler} />
      <SamePageTransition transitionKey={name}>
        <a id="main">Main Content</a>
        <h1 class="category-name">{name}</h1>
      </SamePageTransition>
    </head>
    <div class="category-posts-list">
      <Flourish />
      <SamePageTransition transitionKey={name} animateHeight>
        {#if posts && posts.length}
          <ul>
            {#each posts as { attributes: { title, publishedAt, slug, summary, position, hero: { alternativeText, data: { attributes: { formats: { thumbnail, small, medium } } } } } }, i}
              {@const date = new Date(publishedAt).toDateString()}
              <li class="post-item">
                <a href="/post/{slug}">
                  <div class="post-item-heading">
                    <h2 class="post-title">{title}</h2>
                    <time datetime={date} class="post-date">{date}</time>
                  </div>
                  <div
                    class="post-item-image"
                    style="background-image: url('{thumbnail?.url}'); {position &&
                      `background-position: ${position};`}"
                  />
                </a>
                {#if summary}
                  <div class="post-item-summary">
                    <SvelteMarkdown
                      renderers={{ link: Link }}
                      source={summary}
                    />
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
        {:else}
          <p class="summary">There aren't any posts yet! Come back soon.</p>
        {/if}
      </SamePageTransition>
    </div>

    <aside class="category-aside">
      <PageNav {categories} {pathname} {activeHandler} />
    </aside>
  </section>
</PageTransition>
<Meta {pageMeta} />
