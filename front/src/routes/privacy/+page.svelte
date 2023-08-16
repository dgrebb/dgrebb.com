<script>
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Code from '@components/content/Code.svelte';
  import Link from '@components/content/renderers/Link.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import ScrollTop from '@layout/ScrollTop.svelte';
  import SvelteMarkdown from 'svelte-markdown';

  export let data;
  const { title, details, pageMeta, updatedAt, pathname } = data;
  let date = new Date(updatedAt);
  date = date.toDateString();
</script>

<PageTransition transitionKey={pathname}>
  <section class="privacy">
    <Flourish />
    <div class="masthead">
      <a id="main">Main Content</a>
      <h1 class="title">{title}</h1>
      <h2 class="date">Effective Date: <mark>{date}</mark></h2>
    </div>
    <SvelteMarkdown renderers={{ link: Link, code: Code }} source={details} />
  </section>

  <slot name="scroll-top">
    <ScrollTop />
  </slot>
</PageTransition>

<Meta {pageMeta} />
