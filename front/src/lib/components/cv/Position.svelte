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
    projects: { data: projects },
  } = content.position;
</script>

<h1 class="collection-title">Roles</h1>

<h1>{title}</h1>
{#each skills as { attributes: { skill, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{skill}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
