<script>
  export let content;
  let {
    name,
    seo,
    industrySlug,
    summary,
    skills: { data: skills },
    organizations: { data: organizations },
    positions: { data: positions },
    projects: { data: projects },
    body,
  } = content.industry;
</script>

<h1 class="collection-title">Industries</h1>

<h1>{name}</h1>

{#if organizations}
  <h2>Organizations</h2>
  {#each organizations as { attributes: { name, slug: organizationSlug } }}
    <h2><a href="/cv/organization/{organizationSlug}">{name}</a></h2>
  {/each}
{/if}

{#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
