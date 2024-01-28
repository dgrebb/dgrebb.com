<script>
  export let content;
  import '@styles/pages/skills.css';

  let {
    name,
    body,
    artifacts,
    artifacts: { websites, videos },
    organizations: { data: organizations },
    industries: { data: industries },
    awards: { data: awards },
    skills: { data: skills },
  } = content.project;
</script>

<article class="project-article">
  <header class="experience__header">
    <p class="collection__title">Projects</p>
    <h1>{name}</h1>
  </header>

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
