<script>
  export let content;

  let {
    skill,
    hero,
    slug: skillSlug,
    summary,
    proficiency,
    icon,
    classification: { data: classification },
    projects: { data: projects },
    positions: { data: positions },
    organizations: { data: organizations },
    seo,
  } = content.skill;
</script>

<h1>{skill}</h1>
{#if summary}
  <p>{summary}</p>
{/if}

<!-- TODO: each of these should be placed in a single component and passed the data, or just the collection name -->
{#if classification.length}
  <h2>Classification</h2>
  <ul class="collection-attributes">
    {#each classification as { attributes: { classification, slug: classificationSlug } }}
      <li class="attribute">
        <a href="/cv/classification/{classificationSlug}">{classification}</a>
      </li>
    {/each}
  </ul>
{/if}

{#if projects.length}
  <h2>Project Utilization</h2>
  <ul class="collection-attributes">
    {#each projects as { attributes: { name, slug: projectSlug } }}
      <li class="attribute">
        <a href="/cv/project/{projectSlug}">{name}</a>
      </li>
    {/each}
  </ul>
{/if}
