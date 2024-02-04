<script>
  import { PATHS } from '$lib/CONSTANTS';
  const { experience: exPath, project: projPath } = PATHS.one;

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
    <h2><a href="{exPath}/{experienceSlug}">{name}</a></h2>
  {/each}

  {#if body}
    {body}
  {/if}

  {#each projects as { attributes: { name, slug: projectSlug } }}
    <h2><a href="{projPath}/{projectSlug}">{name}</a></h2>
  {/each}
</article>
