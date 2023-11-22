<script>
  export let content;
  let {
    name,
    body,
    industries: { data: industries },
    positions: { data: positions },
    skills: { data: skills },
    projects: { data: projects },
  } = content.organization;
</script>

<h1 class="collection-title">Organizations</h1>

<h1>{name}</h1>

{#if body}
  {body}
{/if}

{#each industries as { attributes: { name, slug: industrySlug } }}
  <h2><a href="/cv/industry/{industrySlug}">{name}</a></h2>
{/each}

{#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each}

{#each positions as { attributes: { name, slug: positionSlug } }}
  <h2><a href="/cv/position/{positionSlug}">{name}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
