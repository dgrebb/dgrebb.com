<script>
  export let content;
  let {
    award,
    slug,
    URL,
    date,
    summary,
    body,
    seo,
    positions: { data: positions },
    projects: { data: projects },
  } = content.award;
</script>

<h1 class="collection-title">Awards</h1>

<h1>{award}</h1>
{#each positions as { attributes: { title, slug: positionSlug } }}
  <h2><a href="/cv/position/{positionSlug}">{title}</a></h2>
{/each}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
