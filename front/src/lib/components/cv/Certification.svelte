<script>
  export let content;
  let {
    name,
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

<h1 class="collection-title">Certifications</h1>

<h1>{name}</h1>
{#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each}
