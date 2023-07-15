<script>
  import PageTransition from "@components/PageTransition.svelte";
  import Code from "@components/content/Code.svelte";
  import Link from "@components/content/renderers/Link.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import ScrollTop from "@layout/ScrollTop.svelte";
  import { pageMeta } from "@store";
  import SvelteMarkdown from "svelte-markdown";

  export let data;
  const { title, details, updatedAt, seo, pathname } = data;
  $pageMeta = { ...$pageMeta, ...seo, title, titleTemplate: "%s | Dan Grebb" };
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
