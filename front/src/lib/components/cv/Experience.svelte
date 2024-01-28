<script>
  import Aside from '@components/general/Aside/Aside.svelte';
  import AsideGroup from '@components/general/Aside/AsideGroup.svelte';
  import SkillBreakdown from './SkillBreakdown/SkillBreakdown.svelte';
  import '@styles/pages/experience.css';

  export let content;
  let {
    name,
    title,
    body,
    // skills: { data: skills },
    highlightedSkills,
    projects: { data: projects },
    organizations: { data: orgs },
  } = content.experience;
</script>

<article>
  <header class="experience__header">
    <p class="collection__title">Experience</p>
    <h1 class="experience__title">{name}</h1>
    {#if title}<h2>{title}</h2>{/if}

    {#if highlightedSkills.length}
      <SkillBreakdown skills={highlightedSkills} />
      <!-- <div class="skill-graph">
      {#each highlightedSkills as skill}
        <p>{skill.name} - {skill.percentage}</p>
      {/each}
    </div> -->
    {/if}
  </header>

  <Aside>
    {#if orgs?.length}
      <AsideGroup
        collection="experience"
        title={`Organization${orgs.length > 1 ? 's' : ''}`}
        items={orgs}
        singleton="organization"
      />
    {/if}
  </Aside>

  {#if body}
    {@html body}
  {/if}

  <!-- {#each skills as { attributes: { name, slug: skillSlug } }}
  <h2><a href="/cv/skill/{skillSlug}">{name}</a></h2>
{/each} -->

  {#each projects as { attributes: { name, slug: projectSlug } }}
    <h2><a href="/cv/project/{projectSlug}">{name}</a></h2>
  {/each}
</article>
