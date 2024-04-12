<script>
  import Timeline from '@components/cv/Timeline.svelte';
  import Links from '@components/general/Links.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import '@styles/pages/cv.css';

  export let data;

  const { pathname, generalContent, page, experiences, pageMeta } = data;
  const { title, intro } = page;
</script>

<PageTransition transitionKey={pathname}>
  <section class="cv meat">
    <span class="flourish" />
    <!-- svelte-ignore a11y-unknown-role -->
    <header class="cv-masthead" role="header">
      <a id="main">Main Content</a>
      <h1 class="page-heading">{title}</h1>
      <Links links={generalContent.filter((link) => link.cv === true)} />
      <p class="print-links">
        dgrebb.com <br />github.com/dgrebb • linkedin.com/in/dgrebb
      </p>
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
