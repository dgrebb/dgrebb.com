<script>
  export let content;

  let {
    skill,
    hero,
    slug: skillSlug,
    summary,
    proficiency,
    icon,
    classifications: { data: classifications },
    certifications: { data: certifications },
    projects: { data: projects },
    positions: { data: positions },
    organizations: { data: organizations },
    seo,
  } = content.skill;
</script>

<h1 class="collection-title">{skill}</h1>
{#if summary}
  <p>{summary}</p>
{/if}

<!-- TODO: each of these should be placed in a single component and passed the data, or just the collection name -->
{#if certifications.length}
  <h2>certifications</h2>
  <ul class="collection-attributes">
    {#each certifications as { attributes: { title, slug: certificationSlug } }}
      <li class="attribute">
        <a href="/cv/certification/{certificationSlug}">{title}</a>
      </li>
    {/each}
  </ul>
{/if}

{#if classifications.length}
  <h2>Classifications</h2>
  <ul class="collection-attributes">
    {#each classifications as { attributes: { name, slug: classificationSlug } }}
      <li class="attribute">
        <a href="/cv/classification/{classificationSlug}">{name}</a>
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
