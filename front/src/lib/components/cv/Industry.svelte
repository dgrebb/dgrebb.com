<script>
  import { PATHS } from '$lib/CONSTANTS';
  const {
    organizations: orgPath,
    experience: exPath,
    project: projPath,
    skill: skillPath,
  } = PATHS.one;

  export let content;
  let {
    name,
    skills: { data: skills },
    organizations: { data: organizations },
    experiences: { data: experiences },
    projects: { data: projects },
    body,
  } = content.industry;
</script>

<article>
  <header class="experience__header">
    <p class="collection__title">Industries</p>

    <h1>{name}</h1>
  </header>

  {#if body}
    {body}
  {/if}

  {#if organizations}
    <h2>Organizations</h2>
    {#each organizations as { attributes: { name, slug: organizationSlug } }}
      <h2><a href="{orgPath}/{organizationSlug}">{name}</a></h2>
    {/each}
  {/if}

  {#each experiences as { attributes: { name, slug: experienceSlug } }}
    <h2><a href="{exPath}/{experienceSlug}">{name}</a></h2>
  {/each}

  {#each projects as { attributes: { name, slug: projectSlug } }}
    <h2><a href="{projPath}/{projectSlug}">{name}</a></h2>
  {/each}

  {#each skills as { attributes: { name, slug: skillSlug } }}
    <h2><a href="{skillPath}/{skillSlug}">{name}</a></h2>
  {/each}
</article>
