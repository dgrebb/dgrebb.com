<script>
  export let content;
  let {
    name,
    body,
    industries: { data: industries },
    experiences: { data: experiences },
    skills: { data: skills },
    projects: { data: projects },
  } = content.organization;
</script>

<article>
  <header class="experience__header">
    <p class="collection__title">Organizations</p>

    <h1>{name}</h1>
  </header>
  {#if body}
    {body}
  {/if}

  {#each industries as { attributes: { name, slug: industrySlug } }}
    <h2><a href="/cv/industry/{industrySlug}">{name}</a></h2>
  {/each}

  {#each skills as { attributes: { name, slug: skillSlug, svg } }}
    <h2><a href="/cv/skill/{skillSlug}">{name}</a>{@html svg}</h2>
  {/each}

  {#each experiences as { attributes: { name, slug: experienceSlug } }}
    <h2><a href="/cv/experience/{experienceSlug}">{name}</a></h2>
  {/each}

  {#each projects as { attributes: { name, slug: projectSlug } }}
    <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
  {/each}
</article>
