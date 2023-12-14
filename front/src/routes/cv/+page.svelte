<script>
  import Timeline from '@components/cv/Timeline.svelte';
  import Links from '@components/general/Links.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import '@styles/pages/cv.css';

  export let data;

  const { pathname, socialContent, page, experiences, pageMeta } = data;
  const { title, intro } = page;
  // TODO: remove this rule transgressor
  /* eslint-disable no-unused-vars */
</script>

<PageTransition transitionKey={pathname}>
  <section class="cv meat">
    <span class="flourish" />
    <header class="cv-masthead">
      <a id="main">Main Content</a>
      <h1 class="page-heading">{title}</h1>
      <Links links={socialContent} />
      {#if intro}
        <div class="summary">
          {@html intro}
        </div>
      {/if}
    </header>
    <Timeline items={experiences} />
  </section>
</PageTransition>

{#key pathname}
  <Meta {pageMeta} />
{/key}
