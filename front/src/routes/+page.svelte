<script>
  import Image from '@components/general/Image.svelte';
  import Links from '@components/general/Links.svelte';
  import Meta from '@components/general/Meta.svelte';
  import PageTransition from '@components/general/PageTransition.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import '@styles/pages/home.css';

  export let data;
  const { headline, image, intro, links, pageMeta, pathname } = data;
</script>

<PageTransition transitionKey={pathname}>
  <section class="bio">
    <Flourish />
    {#if image}
      <Image
        src={image.url}
        alt={image.alternativeText}
        title="Hi!"
        width={120}
        height={120}
        classes="bio-picture"
      />
    {/if}
    <noscript>
      <img
        src={image.url}
        alt={image.alternativeText}
        title="Hi!"
        width={120}
        height={120}
        class="bio-picture"
      />
    </noscript>
    <a id="main">Main Content</a>
    <h1 class="headline">{headline}</h1>
    {@html intro}
  </section>
  {#if links.length}
    <section class="links">
      <Links {links} />
    </section>
  {/if}
</PageTransition>

<Meta {pageMeta} />
