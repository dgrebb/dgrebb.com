<script>
  import Aside from '@components/general/Aside/Aside.svelte';
  import AsideGroup from '@components/general/Aside/AsideGroup.svelte';
  import SkillBreakdown from '@components/cv/SkillBreakdown/SkillBreakdown.svelte';
  import './experience.css';

  let collection = 'experience';

  export let content;
  let {
    name,
    title,
    body,
    skills: { data: skills },
    highlightedSkills,
    projects: { data: projects },
    organizations: { data: orgs },
  } = content.experience;
</script>

<article class="experience__article">
  <header class="experience__header">
    <p class="collection__title">Experience</p>
    <h1 class="experience__title">{name}</h1>
    {#if title}<h2>{title}</h2>{/if}

    {#if highlightedSkills.length}
      <SkillBreakdown skills={highlightedSkills} />
    {/if}
  </header>

  <Aside>
    {#if orgs?.length}
      <AsideGroup
        {collection}
        title={`Organization${orgs.length > 1 ? 's' : ''}`}
        items={orgs}
        singleton="organization"
      />
    {/if}
    {#if projects?.length}
      <AsideGroup
        {collection}
        title={`Project${projects.length > 1 ? 's' : ''}`}
        items={projects}
        singleton="project"
      />
    {/if}
    {#if skills?.length}
      <AsideGroup
        {collection}
        title={`Skill${skills.length > 1 ? 's' : ''}`}
        items={skills}
        singleton="skill"
      />
    {/if}
  </Aside>

  <section class="experience__body">
    {#if body}
      {@html body}
    {/if}
  </section>
</article>
