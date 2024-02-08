<script>
  import Aside from '@components/general/Aside/Aside.svelte';
  import Article from '@layouts/Article.svelte';
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

<Article>
  <header class="article__header" slot="header">
    <p class="collection__title">Projects</p>
    <h1>{name}</h1>
  </header>

  <Aside slot="aside">
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

  <section class="project-details" slot="content">
    {#if body}
      {@html body}
    {/if}
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
</Article>
