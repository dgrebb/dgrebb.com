<script>
  export let content;
  let {
    name,
    body,
    positions: { data: positions },
    projects: { data: projects },
  } = content.award;
</script>

<h1 class="collection-title">Awards</h1>

<h1>{name}</h1>
{#each positions as { attributes: { name, slug: positionSlug } }}
  <h2><a href="/cv/position/{positionSlug}">{name}</a></h2>
{/each}

{#if body}
  {body}
{/if}

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}

{#each positions as { attributes: { name, slug: positionSlug } }}
  <h2><a href="/cv/position/{positionSlug}">{name}</a></h2>
{/each}
