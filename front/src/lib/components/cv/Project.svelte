<script>
  import SvelteMarkdown from 'svelte-markdown';

  export let content;

  let {
    seo,
    name,
    hero,
    startDate,
    endDate,
    projectSlug,
    summary,
    body,
    artifacts,
    artifacts: { websites, videos },
    organizations: { data: organizations },
    industries: { data: industries },
    awards: { data: awards },
    skills: { data: skills },
  } = content.project;
</script>

<h1 class="collection-title">Projects</h1>

<article class="project-article">
  <section class="project-details">
    <h1>{name}</h1>

    {#if body}
      <SvelteMarkdown source={body} />
    {/if}
  </section>
  <section class="project-artifacts">
    {#if Object.keys(artifacts).length}
      <h2>Artifacts</h2>
      {#if websites}
        <h3>Websites</h3>
        <ul class="website-artifacts-list">
          {#each websites as { title, URL, URLTitle, description, credits }}
            <li><a href={URL} target="_blank" title={URLTitle}>{title}</a></li>
          {/each}
        </ul>
      {/if}
      {#if videos}
        <h3>Videos</h3>
        {#each videos as { videoFileURL, videoCaptionURL, details: { title, URL, description, credits } }}
          <h4>{title}</h4>
          <div class="video-player">
            <video
              crossorigin="anonymous"
              controls
              class="project-video-player"
            >
              <source src={videoFileURL} type="video/mp4" />
              <track
                default
                kind="captions"
                type="text/vtt"
                src={videoCaptionURL}
                srclang="en"
              />
            </video>
          </div>
        {/each}
      {/if}
    {/if}
  </section>
</article>

<aside class="project-aside">
  <!-- TODO: Similarly, each artifact type should have a component 
  to match, which is dynamically selected by artifact type  -->
  {#if organizations}
    {#if skills}
      <h1>Skills</h1>
      <ul class="project-skills">
        {#each skills as { attributes: { skill, slug: skillSlug } }}
          <li><a href="/cv/skill/{skillSlug}">{skill}</a></li>
        {/each}
      </ul>
    {/if}
    <h1>Organizations</h1>
    <ul class="project-organizations">
      {#each organizations as { attributes: { name, slug: organizationSlug } }}
        <li><a href="/cv/organization/{organizationSlug}">{name}</a></li>
      {/each}
    </ul>
  {/if}

  {#if industries}
    <h1>Industries</h1>
    <ul class="project-industries">
      {#each industries as { attributes: { industry, slug: industrySlug } }}
        <li><a href="/cv/industry/{industrySlug}">{industry}</a></li>
      {/each}
    </ul>
  {/if}
</aside>

<style>
  .project-article {
    float: left;
    width: 80%;
  }
  .project-aside {
    float: right;
    width: 20%;
  }
</style>
