<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Link from "../../components/markdown/Link.svelte";

  export let data;
  const { title, details } = data;
</script>

<section class="privacy">
  <h1>{title}</h1>
  <SvelteMarkdown renderers={{ link: Link }} source={details} />
</section>
