<script>
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import ScrollTop from '@layout/ScrollTop.svelte';
  import '@styles/pages/privacy.css';

  export let data;
  const { title, details, pageMeta, updatedAt, pathname } = data;
  let date = new Date(updatedAt);
  date = date.toDateString();
</script>

<PageTransition transitionKey={pathname}>
  <article class="privacy meat">
    <span class="flourish" />
    <section class="masthead">
      <a id="main">Main Content</a>
      <h1 class="title">{title}</h1>
      <h2 class="date">Effective Date: <mark>{date}</mark></h2>
    </section>
    <section class="privacy-main">
      {@html details}
    </section>
  </article>

  <slot name="scroll-top">
    <ScrollTop />
  </slot>
</PageTransition>

<Meta {pageMeta} />
