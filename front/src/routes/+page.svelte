<script>
  import Image from '@components/Image.svelte';
  import Links from '@components/Links.svelte';
  import Meta from '@components/Meta.svelte';
  import PageTransition from '@components/PageTransition.svelte';
  import Link from '@components/content/renderers/Link.svelte';
  import Flourish from '@layout/Flourish.svelte';
  import SvelteMarkdown from 'svelte-markdown';
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
    <a id="main">Main Content</a>
    <h1 class="headline">{headline}</h1>
    <SvelteMarkdown renderers={{ link: Link }} source={intro} />
  </section>
  {#if links.length}
    <section class="links">
      <Links {links} />
    </section>
  {/if}
</PageTransition>

<Meta {pageMeta} />
