<script>
  import Image from "@components/Image.svelte";
  import Links from "@components/Links.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import Meta from "@components/Meta.svelte";
  import Link from "@components/content/renderers/Link.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let data;
  const { headline, image, intro, links, pageMeta, pathname } = data;
</script>

<PageTransition {pathname}>
  <section class="bio text-center">
    <Flourish />
    {#if image}
      <Image
        src={image.url}
        alt={image.alt}
        title="Hi!"
        classes="bio-picture"
        ariaHidden={true}
      />
      <noscript>
        <img
          src={image.url}
          alt={image.alt}
          title="Hi!"
          classes="bio-picture"
          ariaHidden={true}
        />
      </noscript>
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

<Meta pageMeta={pageMeta} />
