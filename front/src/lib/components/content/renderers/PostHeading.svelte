<script>
  import slug from "slugger/slugger.js";
  export let depth;
  export let raw;
  export let text;
  let offset = 1;
  depth = offset ? depth + offset : depth;

  $: id = slug(text);
</script>

{#if depth === 1}
  <h1 {id}><slot /> <a href="#{id}" class="heading-hashmark">#</a></h1>
{:else if depth === 2}
  <h2 {id}><slot /> <a href="#{id}" class="heading-hashmark">#</a></h2>
{:else if depth === 3}
  <h3 {id}><slot /> <a href="#{id}" class="heading-hashmark">#</a></h3>
{:else if depth === 4}
  <h4 {id}><slot /> <a href="#{id}" class="heading-hashmark">#</a></h4>
{:else if depth === 5}
  <h5 {id}><slot /> <a href="#{id}" class="heading-hashmark">#</a></h5>
{:else if depth === 6}
  <h6 {id}><slot /> <a href="#{id}" class="heading-hashmark">#</a></h6>
{:else}
  {raw}
{/if}
