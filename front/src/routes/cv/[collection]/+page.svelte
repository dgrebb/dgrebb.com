<script>
  import { PATHS } from '$lib/CONSTANTS';
  const { cv } = PATHS.landing;
  import PageTransition from '@components/general/PageTransition.svelte';
  import Meta from '@components/general/Meta.svelte';
  // import SkillIcon from '@components/icons/SkillIcon.svelte';
  import '@styles/pages/cv.css';
  import '@styles/pages/collection.css';

  export let data;

  let title, hero, introduction, pageMeta;

  $: ({
    pathname,
    collection,
    pageData: {
      content: { title, singleItemRoute, hero, introduction },
    },
    pageMeta,
    collectionData,
  } = data);
</script>

<PageTransition transitionKey={collection}>
  <section class="cv meat {collection}">
    <span class="flourish" />
    <a id="main">Main Content</a>
    {#if hero}
      <img src={hero.url} alt={hero.alternativeText} />
    {/if}
    <p class="collection__title">{title}</p>
    {#if introduction}
      <article class="experience-longform">
        {introduction}
      </article>
    {/if}
    <!-- TODO: use a similar svelte:component pattern here for collection lists -->
    {#if collectionData.length}
      <ul class="collection-list">
        {#each collectionData as { attributes: { name, slug } }}
          <li class="collection-list-item">
            <!-- <SkillIcon {name} {slug} /> -->
            <a href="{cv}/{singleItemRoute}/{slug}">{name}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="empty-content">
        <h2>Nothing here yet. You're early!</h2>
        «&nbsp;<a href="{cv}/">Back to CV</a>
      </div>
    {/if}
  </section>
</PageTransition>
<!-- TODO: Remove this conditional when page-ready -->
{#if pageMeta}
  {#key pathname}
    <Meta {pageMeta} />
  {/key}
{/if}
