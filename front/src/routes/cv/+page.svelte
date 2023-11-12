<script>
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';

  export let data;

  const { pathname, page, positions, pageMeta } = data;
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
    {#each positions as { title, slug, description, organizations, industries, projects, skills }, i}
      <h1><a href="/cv/position/{slug}">{title}</a></h1>
      {#each skills as { attributes: { skill, slug: skillSlug, proficiency, description }, i }}
        <a href="/cv/skill/{skillSlug}">
          <h3>{skill}</h3>
        </a>
        <h4>{proficiency}</h4>
      {/each}
      {#each industries as { attributes: { industry, slug: industrySlug }, i }}
        <a href="/cv/skill/{industrySlug}">
          <h3>{industry}</h3>
        </a>
      {/each}
      {#each organizations as { attributes: { name, slug: orgSlug, URL }, i }}
        <a href="/cv/organization/{orgSlug}">
          <h3>{name}</h3>
        </a>
      {/each}
      {#each projects as { attributes: { name, slug: projectSlug, URL, description }, i }}
        <a href="/cv/project/{projectSlug}"> <h3>{name}</h3></a>
        <a href={URL}>Check it out</a>
        <p>{description}</p>
      {/each}
    {/each}
  </section>
</PageTransition>
<Meta {pageMeta} />
