<script>
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Award from '@components/cv/Award.svelte';
  import Certification from '@components/cv/Certification.svelte';
  import Classification from '@components/cv/Classification.svelte';
  import Industry from '@components/cv/Industry.svelte';
  import Organization from '@components/cv/Organization.svelte';
  import Position from '@components/cv/Position.svelte';
  import Project from '@components/cv/Project.svelte';
  import Skill from '@components/cv/Skill.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/cv.css';

  export let data;

  $: ({
    pathname,
    slug,
    collection,
    itemData,
    itemData: { pageMeta },
  } = data);

  const components = {
    award: Award,
    certification: Certification,
    classification: Classification,
    industry: Industry,
    organization: Organization,
    position: Position,
    project: Project,
    skill: Skill,
  };
</script>

<PageTransition transitionKey={slug}>
  <section class="cv meat {collection}">
    <Flourish />
    <a id="main">Main Content</a>
    <svelte:component this={components[collection]} content={itemData} />
  </section>
</PageTransition>
{#key pathname}
  <Meta {pageMeta} />
{/key}
