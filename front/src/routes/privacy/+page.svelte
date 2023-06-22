<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Flourish from '../../components/Flourish.svelte';
  import Code from "../../components/markdown/Code.svelte";
  import Link from "../../components/markdown/Link.svelte";

  export let data;
  const { title, details } = data;
</script>

<section class="privacy">
  <Flourish />
  <h1 class="title">{title}</h1>
  <SvelteMarkdown renderers={{ link: Link, code: Code }} source={details} />
</section>
