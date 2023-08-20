<script>
  import { page } from '$app/stores';
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import TransitionFade from '@components/TransitionFade.svelte';
  import TransitionElasticFly from '@components/TransitionElasticFly.svelte';
  import Link from '@components/content/renderers/Link.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import PageNav from '../../../../lib/components/PageNav.svelte';

  export let data;
  const route = $page.route.id;
  $: ({
    categoriesSingletonContent: { headline },
    categoryCollectionContent: categories,
    categoryContent: { name },
    posts,
    pageMeta,
    pathname,
  } = data);

  const setActiveLink = (e) => {
    const links = e.target.closest('ul').querySelectorAll('a');
    links.forEach((link) => {
      link.classList.toggle('active', false);
    });
    e.target.classList.toggle('active', true);
  };
</script>

<PageTransition transitionKey={route}>
  <section class="category">
    <header class="category-head">
      <a id="main">Main Content</a>
      <h1 class="page-heading">{headline} /</h1>
      <TransitionFade transitionKey={name} delay={500} duration={333}>
        <h2 class="category-name">
          {name}
        </h2>
      </TransitionFade>
      <PageNav {categories} mini top {pathname} {setActiveLink} />
    </header>
    <div class="category-posts-list">
      <Flourish />
      <TransitionElasticFly transitionKey={name} delay={500}>
        {#if posts && posts.length}
          <ul>
            {#each posts as { attributes: { title, publishedAt, slug, summary, position, hero: { data: { attributes: { formats: { thumbnail } } } } } }, i}
              {@const date = new Date(publishedAt).toDateString()}
              <li class="post-item">
                <a href="/post/{slug}">
                  <div class="post-item-heading">
                    <h3 class="post-title">{title}</h3>
                    <time datetime={date} class="post-date">{date}</time>
                  </div>
                  <div
                    class="post-item-image"
                    style="background-image: url('{thumbnail?.url}'); {position &&
                      `background-position: ${position};`}"
                  />
                </a>
                {#if summary && summary.length}
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
      </TransitionElasticFly>
    </div>

    <aside class="category-aside">
      <PageNav {categories} {pathname} {setActiveLink} />
    </aside>
  </section>
</PageTransition>

{#key pathname}
  <Meta {pageMeta} />
{/key}
