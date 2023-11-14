<script>
  export let content;
  let {
    title,
    slug,
    summary,
    body,
    startDate,
    endDate,
    hero,
    seo,
    skills: { data: skills },
  } = content.certification;
</script>

<h1 class="collection-title">Certifcations</h1>

<h1>{title}</h1>
{#each skills as { attributes: { skill, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{skill}</a></h2>
{/each}
