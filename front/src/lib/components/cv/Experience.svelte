<script>
  import SkillBreakdown from './SkillBreakdown.svelte';

  export let content;
  let {
    name,
    title,
    body,
    // skills: { data: skills },
    highlightedSkills,
    projects: { data: projects },
  } = content.experience;
</script>

<h1 class="collection-title">Roles</h1>

<h1 class="experience-title">{name}</h1>

{#if title}<h2>{title}</h2>{/if}

{#if highlightedSkills.length}
  <SkillBreakdown skills={highlightedSkills} />
  <!-- <div class="skill-graph">
    {#each highlightedSkills as skill}
      <p>{skill.name} - {skill.percentage}</p>
    {/each}
  </div> -->
{/if}

{#if body}
  {@html body}
{/if}

<!-- {#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each} -->

{#each projects as { attributes: { name, slug: projectSlug } }}
  <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
{/each}
