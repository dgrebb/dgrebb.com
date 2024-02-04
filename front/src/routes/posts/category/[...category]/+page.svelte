<script>
  import { PATHS } from '$lib/CONSTANTS';
  import { page } from '$app/stores';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import TransitionElasticFly from '@components/general/TransitionElasticFly.svelte';
  import Tag from '@components/icons/Tag.svelte';
  import PageNav from '@components/general/PageNav/PageNav.svelte';
  import '@styles/pages/category.css';

  const { post: postPath, category: categoryPath } = PATHS.one;
  export let data;
  const route = $page.route.id;
  $: ({
    category,
    categoryPageContent: { headline },
    categoriesListContent: categories,
    individualCategoryContent: { name },
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
  <section class="category meat">
    <!-- svelte-ignore a11y-unknown-role -->
    <header class="category-head" role="header">
      <a id="main">Main Content</a>
      <h1 class="page-heading">{headline}</h1>
      <!-- <TransitionFade transitionKey={name} delay={500} duration={333}>
        <h2 class="category-name">
          {name}
        </h2>
      </TransitionFade> -->
      <PageNav {categories} mini top {pathname} {setActiveLink} {category} />
    </header>
    <div class="category-posts-list">
      <span class="flourish" />
      <TransitionElasticFly
        transitionKey={name}
        delay={500}
        classList="category-posts-transition-container"
      >
        {#if posts && posts.length}
          <ul>
            {#each posts as { attributes: { title, publishedAt, slug, summary, categories, position, hero: { data: { attributes: { formats: { thumbnail } } } } } }}
              {@const date = new Date(publishedAt).toDateString()}
              <li class="post-item">
                <a href="{postPath}/{slug}">
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
                <ul class="category-tags">
                  {#each categories.data as { attributes: { name, slug } }}
                    <li class="category-tag" class:active={category === slug}>
                      <a href="{categoryPath}/{slug}">
                        <Tag />{name}
                      </a>
                    </li>
                  {/each}
                </ul>
                {#if summary && summary.length}
                  <div class="post-item-summary">
                    {@html summary}
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
        {:else}
          <p class="summary">
            There aren't any posts like that yet. Come back soon!
          </p>
        {/if}
      </TransitionElasticFly>
    </div>

    <aside class="aside" role="navigation">
      <PageNav {categories} {pathname} {setActiveLink} {category} />
    </aside>
  </section>
</PageTransition>

{#key pathname}
  <Meta {pageMeta} />
{/key}
