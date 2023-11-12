<script>
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';

  export let data;
  let positionsContent;
  let projectsContent;
  let skillsContent;
  let organizationsContent;

  const { pathname, page, pageMeta } = data;
  const { title, hero, intro } = page;
</script>

<PageTransition transitionKey={pathname}>
  <section class="cv">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>{title}</h1>
    {#if hero}
      <img src={hero.url} alt={hero.alternativeText} />
    {/if}
    <div class="summary">
      {intro}
    </div>
  </section>
</PageTransition>
<Meta {pageMeta} />
