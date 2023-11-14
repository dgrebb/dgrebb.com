<script>
  export let content;
  let {
    industry,
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

{#if organizations}
  <h2>Organizations</h2>
  {#each organizations as { attributes: { organization, slug: organizationSlug } }}
    <h2><a href="/cv/organization/{organizationSlug}">{organization}</a></h2>
  {/each}
{/if}

<h1>{industry}</h1>
{#each skills as { attributes: { skill, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{skill}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
