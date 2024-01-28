<script>
  export let content;
  let {
    name,
    body,
    experiences: { data: experiences },
    projects: { data: projects },
  } = content.award;
</script>

<article>
  <header class="experience__header">
    <p class="collection__title">Awards</p>
    <h1>{name}</h1>
  </header>

  {#each experiences as { attributes: { name, slug: experienceSlug } }}
    <h2><a href="/cv/experience/{experienceSlug}">{name}</a></h2>
  {/each}

  {#if body}
    {body}
  {/if}

  {#each projects as { attributes: { name, slug: projectSlug } }}
    <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
  {/each}

  {#each experiences as { attributes: { name, slug: experienceSlug } }}
    <h2><a href="/cv/experience/{experienceSlug}">{name}</a></h2>
  {/each}
</article>
