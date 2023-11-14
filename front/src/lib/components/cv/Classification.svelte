<script>
  export let content;

  let {
    name,
    slug: classificationSlug,
    summary,
    skills: { data: skills },
    seo,
  } = content.classification;
</script>

<h1>{name}</h1>
{#if summary}
  <p>{summary}</p>
{/if}

<h1 class="collection-title">Trades</h1>

<!-- TODO: each of these should be placed in a single component and passed the data, or just the collection name -->
{#if skills.length}
  <h2>skills</h2>
  <ul class="collection-attributes">
    {#each skills as { attributes: { skill, slug: skillSlug } }}
      <li class="attribute">
        <a href="/cv/skill/{skillSlug}">{skill}</a>
      </li>
    {/each}
  </ul>
{/if}
