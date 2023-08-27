<script>
  import slug from 'slugger/slugger.js';
  export let depth;
  export let raw;
  export let text;
  let offset = 1;
  depth = offset ? depth + offset : depth;

  $: id = slug(text);
</script>

{#if depth === 1}
  <h1 {id} class="post-heading">
    <a href="#{id}" class="heading-anchor-link" aria-hidden="true">#</a>
    <slot />
  </h1>
{:else if depth === 2}
  <h2 {id} class="post-heading">
    <a href="#{id}" class="heading-anchor-link" aria-hidden="true">#</a>
    <slot />
  </h2>
{:else if depth === 3}
  <h3 {id} class="post-heading">
    <a href="#{id}" class="heading-anchor-link" aria-hidden="true">#</a>
    <slot />
  </h3>
{:else if depth === 4}
  <h4 {id} class="post-heading">
    <a href="#{id}" class="heading-anchor-link" aria-hidden="true">#</a>
    <slot />
  </h4>
{:else if depth === 5}
  <h5 {id} class="post-heading">
    <a href="#{id}" class="heading-anchor-link" aria-hidden="true">#</a>
    <slot />
  </h5>
{:else if depth === 6}
  <h6 {id} class="post-heading">
    <a href="#{id}" class="heading-anchor-link" aria-hidden="true">#</a>
    <slot />
  </h6>
{:else}
  {raw}
{/if}
