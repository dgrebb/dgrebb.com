<script>
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/cv.css';

  export let data;

  let title, hero, introduction, seo;

  $: ({
    collection,
    pageData: {
      content: { title, hero, introduction, seo },
    },
  } = data);
</script>

<PageTransition transitionKey={collection}>
  <section class="cv meat">
    <Flourish />
    <a id="main">Main Content</a>
    {#if hero}
      <img src={hero.url} alt={hero.alternativeText} />
    {/if}
    <h1 class="collection-title">{title}</h1>
    {#if introduction}
      <article class="position-longform">
        {introduction}
      </article>
    {/if}
    <!-- TODO: use a similar svelte:component pattern here for collection lists -->
  </section>
</PageTransition>
<!-- <Meta {pageMeta} /> -->
