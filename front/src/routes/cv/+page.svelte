<script>
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
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
    <div class="summary">
      {intro}
    </div>
    {#each positions as { title, slug, startDate, endDate, summary, awards, industries, organizations, projects, skills }, i}
      <div class="position-timeline-item">
        <h1><a href="/cv/position/{slug}">{title}</a></h1>
        <date class="position-timeline-date"
          >{#if endDate}{startDate}{:else}Current{/if}</date
        >
        <p>{summary}</p>
        {#each awards as { attributes: { award, slug: awardSlug, URL }, i }}
          <a href="/cv/award/{awardSlug}">
            <h3>{award}</h3>
          </a>
        {/each}
        {#each organizations as { attributes: { name, slug: orgSlug, URL }, i }}
          <a href="/cv/organization/{orgSlug}">
            <h3>{name}</h3>
          </a>
        {/each}
        {#each projects as { attributes: { name, slug: projectSlug, URL, summary }, i }}
          <a href="/cv/project/{projectSlug}"> <h3>{name}</h3></a>
          <a href={URL}>Check it out</a>
        {/each}
        {#each skills as { attributes: { skill, slug: skillSlug, proficiency, summary }, i }}
          <a href="/cv/skill/{skillSlug}">
            <h3>{skill} ➔ {proficiency}</h3>
          </a>
        {/each}
        {#each industries as { attributes: { industry, slug: industrySlug }, i }}
          <a href="/cv/industry/{industrySlug}">
            <h3>{industry}</h3>
          </a>
        {/each}
      </div>
    {/each}
  </section>
</PageTransition>
<Meta {pageMeta} />
