<script>
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Position from '@components/cv/Position.svelte';
  import Project from '@components/cv/Project.svelte';
  import Skill from '@components/cv/Skill.svelte';
  import Flourish from '@layout/Flourish.svelte';

  export let data;

  $: ({
    slug,
    collection,
    itemData,
    itemData: { pageMeta },
  } = data);

  const components = {
    position: Position,
    project: Project,
    skill: Skill,
  };
</script>

<PageTransition transitionKey={slug}>
  <section class="cv meat">
    <Flourish />
    <a id="main">Main Content</a>
    <svelte:component this={components[collection]} content={itemData} />
  </section>
</PageTransition>
<Meta {pageMeta} />
