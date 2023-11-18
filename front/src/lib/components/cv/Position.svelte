<script>
  export let content;
  let {
    name,
    slug,
    title,
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

<h1>{name}</h1>
{#if title}<h2>{title}</h2>{/if}
{#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
