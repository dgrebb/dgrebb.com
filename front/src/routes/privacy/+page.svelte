<script>
  import SvelteMarkdown from "svelte-markdown";
  import Flourish from "../../layout/Flourish.svelte";
  import Code from "../../components/markdown/Code.svelte";
  import Link from "../../components/markdown/Link.svelte";
  import ScrollTop from "../../layout/ScrollTop.svelte";
  import PageTransition from "../../components/PageTransition.svelte";

  export let data;
  const { title, details, updatedAt, pathname } = data;
  let date = new Date(updatedAt);
  date = date.toDateString();
</script>

<PageTransition {pathname}>
  <section class="privacy">
    <Flourish />
    <a id="main">Main Content</a>
    <h1 class="title">{title}</h1>
    <h2 class="date">Effective Date: <mark>{date}</mark></h2>
    <SvelteMarkdown renderers={{ link: Link, code: Code }} source={details} />
  </section>
</PageTransition>

<slot name="scroll-top">
  <ScrollTop />
</slot>
