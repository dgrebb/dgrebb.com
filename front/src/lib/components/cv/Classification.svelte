<script>
  export let content;

  let {
    name,
    body,
    summary,
    skills: { data: skills },
  } = content.classification;
</script>

<h1 class="collection-title">Trades</h1>

<h1>{name}</h1>
{#if summary}
  <p>{summary}</p>
{/if}

{#if body}
  {body}
{/if}

<!-- TODO: each of these should be placed in a single component and passed the data, or just the collection name -->
{#if skills.length}
  <h2>skills</h2>
  <ul class="collection-attributes">
    {#each skills as { attributes: { name, slug: skillSlug } }}
      <li class="attribute">
        <a href="/cv/skill/{skillSlug}">{name}</a>
      </li>
    {/each}
  </ul>
{/if}
