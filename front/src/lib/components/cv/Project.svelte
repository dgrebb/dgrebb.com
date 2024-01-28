<script>
  import Aside from '@components/general/Aside/Aside.svelte';
  import AsideGroup from '@components/general/Aside/AsideGroup.svelte';
  import '@styles/pages/skills.css';

  export let content;
  let collection = 'projects';
  let {
    name,
    body,
    artifacts,
    artifacts: { websites, videos },
    organizations: { data: orgs },
    awards: { data: awards },
    skills: { data: skills },
  } = content.project;
</script>

<article class="project-article">
  <header class="experience__header">
    <p class="collection__title">Projects</p>
    <h1>{name}</h1>
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
    {#if awards?.length}
      <AsideGroup
        {collection}
        title={`Project${awards.length > 1 ? 's' : ''}`}
        items={awards}
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

  <section class="project-details">
    {#if body}
      {@html body}
    {/if}
  </section>
  <section class="project-artifacts">
    {#if Object.keys(artifacts).length}
      <h2>Artifacts</h2>
      {#if websites}
        <h3>Websites</h3>
        <ul class="website-artifacts-list">
          {#each websites as { title, URL, URLTitle, description, credits }}
            <li>
              <a href={URL} target="_blank" title={URLTitle}>{title}</a>
              {#if description}{description}{/if}
              {#if credits}{credits}{/if}
            </li>
          {/each}
        </ul>
      {/if}
      {#if videos}
        <h3>Videos</h3>
        {#each videos as { videoFile, videoCaptions, details: { title, URL, description, credits } }}
          <h4>{title}</h4>
          <div class="video-player">
            <!-- svelte-ignore a11y-media-has-caption -->
            <!--TODO: Remove ignore-rule -->
            <video
              crossorigin="anonymous"
              controls
              class="project-video-player"
            >
              <source src={videoFile} type="video/mp4" />
              {#if videoCaptions}
                <track
                  default
                  kind="captions"
                  type="text/vtt"
                  src={videoCaptions}
                  srclang="en"
                />
              {/if}
            </video>
            {#if URL}{URL}{/if}
            {#if description}{description}{/if}
            {#if credits}{credits}{/if}
          </div>
        {/each}
      {/if}
    {/if}
  </section>
</article>
