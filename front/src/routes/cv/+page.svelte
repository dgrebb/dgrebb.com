<script>
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import Calendar from '@components/icons/Calendar.svelte';
  import '@styles/pages/cv.css';

  export let data;

  const { pathname, page, positions, pageMeta } = data;
  const { title, hero, intro } = page;

  function convertDateFormat(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }
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
    <div class="career-timeline">
      <Calendar />
      {#each positions as { name, slug, title, startDate, endDate, summary, awards, industries, organizations, projects, skills }}
        <div class="career-timeline-item">
          <h1 class="item-title"><a href="/cv/position/{slug}">{name}</a></h1>
          <time datetime={startDate} class="career-timeline-date"
            >{#if endDate}{convertDateFormat(
                startDate
              )}{:else}Current{/if}</time
          >
          {#if title}<h2>{title}</h2>{/if}
          {#if summary}
            <p>{summary}</p>
          {/if}
          <details>
            <summary>Details</summary>
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
                  {#if svg}<span class="skill-icon">{@html svg}</span
                    >{/if}{name} ➔
                  {proficiency}
                </h3>
              </a>
            {/each}
            {#each industries as { attributes: { name, slug: industrySlug } }}
              <a href="/cv/industry/{industrySlug}">
                <h3>{name}</h3>
              </a>
            {/each}
          </details>
        </div>
      {/each}
    </div>
  </section>
</PageTransition>
<Meta {pageMeta} />
