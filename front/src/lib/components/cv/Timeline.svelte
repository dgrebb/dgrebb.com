<script>
  import { PATHS } from '$lib/CONSTANTS';
  const { experience: exPath } = PATHS.one;
  import SkillIcon from '@components/icons/SkillIcon.svelte';
  import Calendar from '@components/icons/Calendar.svelte';
  import '@styles/pages/cv.css';

  export let items;

  const currentYear = new Date().getFullYear();

  function prettyDate(inputDate) {
    const [year, month, day] = inputDate.split('-');
    var date = new Date(year, month - 1, day);
    const options = { year: 'numeric', month: 'long' };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return {
      month: formattedDate.split(' ')[0],
      year: formattedDate.split(' ')[1],
    };
  }
  // TODO: remove this rule transgressor
  /* eslint-disable no-unused-vars */
</script>

<div class="experience-timeline">
  {#if items.length}<Calendar />{/if}
  {#each items as { name, slug, startDate, endDate, summary, story, skillBreakdown, organizations, skills }}
    <section class="experience-timeline-item" class:current={!endDate}>
      <!-- svelte-ignore a11y-unknown-role -->
      <header class="item-basics" role="header">
        {#if skillBreakdown.length}
          <h2 class="item-title"><a href="{exPath}/{slug}">{name}</a></h2>
        {:else}
          <h2 class="item-title">{name}</h2>
        {/if}
        {#if endDate}<span class="arrow" aria-hidden="true"></span>{/if}
        <time datetime={startDate} class="experience-timeline-date">
          {#if endDate}
            <span class="experience-timeline-date-month"
              >{prettyDate(startDate).month}</span
            >
            <span class="timeline-text-highlight"
              >{prettyDate(startDate).year}</span
            >
            <span class="print-date"
              >{prettyDate(startDate).year} - {prettyDate(endDate).year}</span
            >
          {:else}
            <span class="timeline-text-highlight m">{currentYear}</span>
            <span class="timeline-text-highlight d">Current</span>
          {/if}
        </time>
        {#if endDate}
          <time datetime={endDate} class="experience-timeline-date--end">
            <span class="experience-timeline-date-month"
              >{prettyDate(endDate).month}</span
            >
            <span class="timeline-text-highlight"
              >{prettyDate(endDate).year}</span
            >
          </time>
        {/if}
      </header>
      <!-- svelte-ignore a11y-no-redundant-roles -->
      <main class="item-details" role="main">
        <div class="experience-info">
          <p class="item-organizations">
            {#each organizations as { attributes: { name, slug: orgSlug } }, i}
              {@const self = name.toLowerCase().includes('self')}
              <span class="organization" class:self>
                {name}{#if i < organizations.length - 1},&nbsp;{/if}
              </span>
            {/each}
          </p>
          <ul class="skills">
            {#each skills as { attributes: { name, slug: skillSlug } }}
              <li class="skill" title={name}>
                <SkillIcon {name} slug={skillSlug} />
              </li>
            {/each}
          </ul>
        </div>
        <div class="experience-summary">
          {#if story}
            {@html story}
          {:else if summary}
            {@html summary}
          {/if}
        </div>
      </main>
    </section>
  {/each}
</div>
