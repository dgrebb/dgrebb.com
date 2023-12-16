<script>
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
  {#each items as { name, slug, startDate, endDate, story, organizations, skills }}
    <section class="experience-timeline-item" class:current={!endDate}>
      <header class="item-basics">
        <h1 class="item-title">{name}</h1>
        {#if endDate}<span class="arrow" aria-hidden="true"></span>{/if}
        <time datetime={startDate} class="experience-timeline-date">
          {#if endDate}
            <span class="experience-timeline-date-month"
              >{prettyDate(startDate).month}</span
            >
            <span class="timeline-text-highlight"
              >{prettyDate(startDate).year}</span
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
      <main class="item-details">
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
        {#if story}
          <p class="experience-summary">{@html story}</p>
        {/if}
      </main>
    </section>
  {/each}
</div>
