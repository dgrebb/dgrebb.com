<script>
  import SkillIcon from '@components/icons/SkillIcon.svelte';
  import '@styles/pages/skill.css';
  export let content;

  let {
    name,
    body,
    hero,
    slug,
    summary,
    proficiency,
    classifications: { data: classifications },
    certifications: { data: certifications },
    projects: { data: projects },
    experiences: { data: experiences },
    organizations: { data: organizations },
  } = content.skill;
</script>

<h1 class="skill-title">
  <span class="skill-icon"><SkillIcon {slug} {name} /></span>{name}
</h1>
{#if hero}
  {hero}
{/if}
{#if summary}
  <p>{summary}</p>
{/if}

<label for={name}>Proficiency:</label>
<meter
  id={name}
  min="0"
  max="10"
  low="2"
  high="8"
  optimum="`0`"
  value={proficiency}>at at {proficiency}/10</meter
>
{#if body}
  {body}
{/if}

<!-- TODO: each of these should be placed in a single component and passed the data, or just the collection name -->
{#if certifications.length}
  <h2>certifications</h2>
  <ul class="collection-attributes">
    {#each certifications as { attributes: { name, slug: certificationSlug } }}
      <li class="attribute">
        <a href="/cv/certification/{certificationSlug}">{name}</a>
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

{#if experiences.length}
  <h2>Experiences</h2>
  <ul class="collection-attributes">
    {#each experiences as { attributes: { name, slug: experienceSlug } }}
      <li class="attribute">
        <a href="/cv/experience/{experienceSlug}">{name}</a>
      </li>
    {/each}
  </ul>
{/if}

{#if organizations.length}
  <h2>Organizations Worked In</h2>
  <ul class="collection-attributes">
    {#each organizations as { attributes: { name, slug: organizationSlug } }}
      <li class="attribute">
        <a href="/cv/organization/{organizationSlug}">{name}</a>
      </li>
    {/each}
  </ul>
{/if}
