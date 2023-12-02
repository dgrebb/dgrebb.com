<script>
  import SkillIcon from '@components/icons/SkillIcon.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import Calendar from '@components/icons/Calendar.svelte';
  import '@styles/pages/cv.css';
  import Links from '@components/general/Links.svelte';

  export let data;

  const { pathname, socialContent, page, experiences, pageMeta } = data;
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
    <header class="cv-masthead">
      <a id="main">Main Content</a>
      <!-- {#if hero}
        <img src={hero.url} alt={hero.alternativeText} />
      {/if} -->
      <h1 class="page-heading">{title}</h1>
      <Links links={socialContent} />
      {#if intro}
        <div class="summary">
          {@html intro}
        </div>
      {/if}
    </header>
    <div class="experience-timeline">
      {#if experiences.length}<Calendar />{/if}
      {#each experiences as { name, slug, startDate, endDate, summary, organizations, skills }}
        <section class="experience-timeline-item" class:current={!endDate}>
          <header class="item-basics">
            <!-- <h1 class="item-title"><a href="/cv/experience/{slug}">{name}</a></h1> -->
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
            <div class="experience-info">
              <p class="item-organizations">
                {#each organizations as { attributes: { name, slug: orgSlug } }, i}
                  {@const self = name.toLowerCase().includes('self')}
                  <!-- <a href="/cv/organization/{orgSlug}">{name}</a
                  >{#if i < organizations.length - 1},&nbsp;
                  {/if} -->
                  <span class="organization" class:self
                    >{name}{#if i < organizations.length - 1},&nbsp;
                    {/if}</span
                  >
                {/each}
              </p>
              <ul class="skills">
                {#each skills as { attributes: { name, slug: skillSlug } }}
                  <li class="skill" title={name}>
                    <!-- <a
                        href="/cv/skill/{skillSlug}"
                        class="skill"
                        title={name}
                      >
                      </a> -->
                    <SkillIcon {name} slug={skillSlug} />
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
                {/each}
              </ul>
            </div>
            {#if summary}
              <p class="experience-summary">{summary}</p>
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
{#key pathname}
  <Meta {pageMeta} />
{/key}
