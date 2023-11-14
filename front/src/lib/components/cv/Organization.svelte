<script>
  export let content;
  let {
    name,
    organizationSlug,
    images,
    URL,
    summary,
    body,
    industries: { data: industries },
    positions: { data: positions },
    skills: { data: skills },
    projects: { data: projects },
  } = content.organization;
</script>

<h1 class="collection-title">Organizations</h1>

<h1>{name}</h1>

{#each industries as { attributes: { industry, slug: industrySlug } }}
  <h2><a href="/cv/industry/{industrySlug}">{industry}</a></h2>
{/each}

{#each skills as { attributes: { skill, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{skill}</a></h2>
{/each}

{#each positions as { attributes: { title, slug: positionSlug } }}
  <h2><a href="/cv/position/{positionSlug}">{title}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
