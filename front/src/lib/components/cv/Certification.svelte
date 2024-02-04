<script>
  import { PATHS } from '$lib/CONSTANTS';
  const { skill: skillPath } = PATHS.one;
  export let content;
  let {
    name,
    body,
    skills: { data: skills },
  } = content.certification;
</script>

<article>
  <header class="experience__header">
    <p class="collection__title">Certifications</p>

    <h1>{name}</h1>
  </header>
  {#if body}
    {body}
  {/if}
  {#each skills as { attributes: { name, slug: skillSlug } }}
    <h2><a href="{skillPath}/{skillSlug}">{name}</a></h2>
  {/each}
</article>
