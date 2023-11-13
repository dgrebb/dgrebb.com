<script>
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';

  export let data;

  // TODO: Import content mappers from a helpers library
  // then use the collection slug to select the api and map content appropriately

  const { pathname, position, pageMeta } = data;
  const { title, hero, body } = position;
</script>

<PageTransition transitionKey={pathname}>
  <section class="cv meat">
    <Flourish />
    <a id="main">Main Content</a>
    <img src={hero.url} alt={hero.alternativeText} />
    <h1>{title}</h1>
    {#if body}
      <article class="position-longform">
        {body}
      </article>
    {/if}
  </section>
</PageTransition>
<Meta {pageMeta} />
