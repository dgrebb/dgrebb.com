<script>
  import SkillIcon from '@components/icons/SkillIcon.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import Calendar from '@components/icons/Calendar.svelte';
  import '@styles/pages/cv.css';

  export let data;

  const { pathname, page, positions, pageMeta } = data;
  const { title, intro } = page;
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

<PageTransition transitionKey={pathname}>
  <section class="cv meat">
    <Flourish />
    <a id="main">Main Content</a>
    <h1>{title}</h1>
    <!-- {#if hero}
      <img src={hero.url} alt={hero.alternativeText} />
    {/if} -->
    {#if intro}
      <div class="summary">
        {intro}
      </div>
    {/if}
    <div class="experience-timeline">
      <Calendar />
      {#each positions as { name, slug, startDate, endDate, summary, organizations, skills }}
        <section class="experience-timeline-item" class:current={!endDate}>
          <header class="item-basics">
            <!-- <h1 class="item-title"><a href="/cv/position/{slug}">{name}</a></h1> -->
            <h1 class="item-title">{name}</h1>
            <time datetime={startDate} class="experience-timeline-date"
              >{#if endDate}<span class="experience-timeline-date-month"
                  >{prettyDate(startDate).month}</span
                >
                <span class="timeline-text-highlight"
                  >{prettyDate(startDate).year}</span
                >{:else}<span class="timeline-text-highlight m"
                  >{currentYear}</span
                ><span class="timeline-text-highlight d">Current</span
                >{/if}</time
            >
          </header>
          <main class="item-details">
            <div class="position-info">
              <p class="item-organizations">
                {#each organizations as { attributes: { name, slug: orgSlug } }, i}
                  <!-- <a href="/cv/organization/{orgSlug}">{name}</a
                  >{#if i < organizations.length - 1},&nbsp;
                  {/if} -->
                  {name}{#if i < organizations.length - 1},&nbsp;
                  {/if}
                {/each}
              </p>
              <ul class="skills">
                {#each skills as { attributes: { name, icon, slug: skillSlug } }}
                  {#if icon.data}
                    <li class="skill" title={name}>
                      <!-- <a
                        href="/cv/skill/{skillSlug}"
                        class="skill"
                        title={name}
                      >
                      </a> -->
                      <SkillIcon
                        iconURL={icon?.data?.attributes?.url || false}
                        iconAltText={icon?.data?.attributes?.alternativeText ||
                          false}
                        slug={skillSlug}
                      />
                    </li>
                    <!-- <li class="skill" title={name}>
                      <a
                        href="/cv/skill/{skillSlug}"
                        class="skill"
                        title={name}
                      >
                        <SkillIcon
                          iconURL={icon.data.attributes.url}
                          slug={skillSlug}
                        />
                      </a>
                    </li> -->
                  {/if}
                {/each}
              </ul>
            </div>
            {#if summary}
              <p class="position-summary">{summary}</p>
            {/if}
          </main>
          <!-- <details class="item-details" open>
            {#if title}<h2>Title: {title}</h2>{/if}
            <summary>Details</summary>
          </details> -->
        </section>
      {/each}
    </div>
  </section>
</PageTransition>
<Meta {pageMeta} />
