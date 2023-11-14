<script>
  export let content;

  let {
    seo,
    name,
    hero,
    startDate,
    endDate,
    projectSlug,
    summary,
    body,
    artifacts,
    artifacts: { websites },
    organizations: { data: organizations },
    industries: { data: industries },
    awards: { data: awards },
    skills: { data: skills },
  } = content.project;
</script>

<h1 class="collection-title">Projects</h1>

<h1>{name}</h1>
{#each skills as { attributes: { skill, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{skill}</a></h2>
{/each}

{#if organizations}
  <h2>Organizations</h2>
  {#each organizations as { attributes: { name, slug: organizationSlug } }}
    <h2><a href="/cv/organization/{organizationSlug}">{name}</a></h2>
  {/each}
{/if}

{#if industries}
  <h2>Industries</h2>
  {#each industries as { attributes: { industry, slug: industrySlug } }}
    <h2><a href="/cv/industry/{industrySlug}">{industry}</a></h2>
  {/each}
{/if}

<!-- TODO: Similarly, each artifact type should have a component 
  to match, which is dynamically selected by artifact type  -->
{#if Object.keys(artifacts).length}
  <h2>Artifacts</h2>
  {#if websites}<h3>Websites</h3>{/if}
  <ul class="website-artifacts-list">
    {#each websites as { title, URL, description, credits }}
      <li><a href={URL} target="_blank">{title}</a></li>
    {/each}
  </ul>
{/if}
