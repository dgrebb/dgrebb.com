<script>
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/cv.css';

  export let data;

  const { pathname, page, positions, pageMeta } = data;
  const { title, hero, intro } = page;
</script>

<PageTransition transitionKey={pathname}>
  <section class="cv meat">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>{title}</h1>
    {#if hero}
      <img src={hero.url} alt={hero.alternativeText} />
    {/if}
    {#if intro}
      <div class="summary">
        {intro}
      </div>
    {/if}
    {#each positions as { name, slug, title, startDate, endDate, summary, awards, industries, organizations, projects, skills }}
      <div class="position-timeline-item">
        <h1><a href="/cv/position/{slug}">{name}</a></h1>
        {#if title}<h2>{title}</h2>{/if}
        <date class="position-timeline-date"
          >{#if endDate}{startDate}{:else}Current{/if}</date
        >
        {#if summary}
          <p>{summary}</p>
        {/if}
        {#each awards as { attributes: { name, slug: awardSlug } }}
          <a href="/cv/award/{awardSlug}">
            <h3>{name}</h3>
          </a>
        {/each}
        {#each organizations as { attributes: { name, slug: orgSlug } }}
          <a href="/cv/organization/{orgSlug}">
            <h3>{name}</h3>
          </a>
        {/each}
        {#each projects as { attributes: { name, slug: projectSlug, URL } }}
          <a href="/cv/project/{projectSlug}"> <h3>{name}</h3></a>
          <a href={URL}>Check it out</a>
        {/each}
        {#each skills as { attributes: { name, slug: skillSlug, svg, proficiency } }}
          <a href="/cv/skill/{skillSlug}">
            <h3>
              {#if svg}<span class="skill-icon">{@html svg}</span>{/if}{name} ➔
              {proficiency}
            </h3>
          </a>
        {/each}
        {#each industries as { attributes: { name, slug: industrySlug } }}
          <a href="/cv/industry/{industrySlug}">
            <h3>{name}</h3>
          </a>
        {/each}
      </div>
    {/each}
  </section>
</PageTransition>
<Meta {pageMeta} />
