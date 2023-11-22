<script>
  export let content;
  let {
    name,
    body,
    skills: { data: skills },
  } = content.certification;
</script>

<h1 class="collection-title">Certifications</h1>

<h1>{name}</h1>

{#if body}
  {body}
{/if}
{#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each}
