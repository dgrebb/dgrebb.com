<script>
  import { PATHS } from '$lib/CONSTANTS';
  const { cv } = PATHS.landing;
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Award from '@components/cv/Award.svelte';
  import Certification from '@components/cv/Certification.svelte';
  import Classification from '@components/cv/Classification.svelte';
  import Industry from '@components/cv/Industry.svelte';
  import Organization from '@components/cv/Organization.svelte';
  import Experience from '@components/cv/Experience/Experience.svelte';
  import Project from '@components/cv/Project.svelte';
  import Skill from '@components/cv/Skill.svelte';
  import '@styles/pages/cv.css';
  import '@styles/pages/collection.css';

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
    experience: Experience,
    project: Project,
    skill: Skill,
  };
</script>

<PageTransition transitionKey={slug}>
  <section class="cv meat singleton {collection}">
    <span class="flourish" />
    <a id="main">Main Content</a>
    {#if itemData}
      <svelte:component this={components[collection]} content={itemData} />
    {:else}
      <div class="empty-content">
        <h2>Nothing here yet. You're early!</h2>
        «&nbsp;<a href="{cv}/">Back to CV</a>
      </div>
    {/if}
  </section>
</PageTransition>
<!-- TODO: Remove this conditional when page-ready -->
{#if pageMeta}
  {#key pathname}
    <Meta {pageMeta} />
  {/key}
{/if}

<style lang="postcss">
  .singleton {
    max-width: 64rem;
  }
  @media screen and (min-width: 640px) {
    .singleton {
      padding: 2.33rem;
    }
  }
</style>
