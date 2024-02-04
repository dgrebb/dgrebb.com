<aside class="collection__aside">
  <!-- TODO: Each artifact type should have a component 
  to match, which is dynamically selected by artifact type  -->

  <slot />

  <!-- {#if awards}
    <h1>Awards</h1>
    <ul class="project-awards">
      {#each awards as { attributes: { name, slug: awardSlug } }}
        <li><a href="/cv/award/{awardSlug}">{name}</a></li>
      {/each}
    </ul>
  {/if}
  {#if organizations}
    {#if skills}
      <h1>Skills</h1>
      <ul class="project-skills">
        {#each skills as { attributes: { name, slug: skillSlug, svg } }}
          <li class="skill">
            <a href="/cv/skill/{skillSlug}"
              >{#if svg}{@html svg}{/if}{name}</a
            >
          </li>
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
      {#each industries as { attributes: { name, slug: industrySlug } }}
        <li><a href="/cv/industry/{industrySlug}">{name}</a></li>
      {/each}
    </ul>
  {/if} -->
</aside>

<style lang="postcss">
  .collection__aside {
    float: right;
    padding-left: 2rem;
    width: 25%;
  }
</style>
