<script>
  import PageTransition from '@components/general/PageTransition.svelte';
  // import SkillIcon from '@components/icons/SkillIcon.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/cv.css';

  export let data;

  let title, hero, introduction;

  $: ({
    collection,
    pageData: {
      content: { title, singleItemRoute, hero, introduction },
    },
    collectionData,
  } = data);
</script>

<PageTransition transitionKey={collection}>
  <section class="cv meat {collection}">
    <Flourish />
    <a id="main">Main Content</a>
    {#if hero}
      <img src={hero.url} alt={hero.alternativeText} />
    {/if}
    <h1 class="collection-title">{title}</h1>
    {#if introduction}
      <article class="experience-longform">
        {introduction}
      </article>
    {/if}
    <!-- TODO: use a similar svelte:component pattern here for collection lists -->
    {#if collectionData}
      <ul class="collection-list">
        {#each collectionData as { attributes: { name, slug } }}
          <li class="collection-list-item">
            <!-- <SkillIcon {name} {slug} /> -->
            <a href={`/cv/${singleItemRoute}/${slug}`}>{name}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</PageTransition>
<!-- <Meta {pageMeta} /> -->
