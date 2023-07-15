<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import Image from "@components/Image.svelte";
  import Links from "@components/Links.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import Link from "@components/content/renderers/Link.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import { pageMeta } from "@store";
  import SvelteMarkdown from "svelte-markdown";

  export let data;
  const { seo, headline, intro, links, pathname } = data;
  const image = seo?.metaImage?.data?.attributes.formats.small || {
    url: "/bio.jpg",
    alt: "A picture of Dan smiling",
  };

  $pageMeta = { ...$pageMeta, ...seo, pathname };
</script>

<PageTransition {pathname}>
  <section class="bio text-center">
    <Flourish />
    {#if image}
      <Image
        src={`${PUBLIC_MEDIA_URL}${image.url}`}
        alt={image.alternativeText}
        title="Hi!"
        classes="bio-picture"
        ariaHidden={true}
      />
      <noscript>
        <img
          src={`${PUBLIC_MEDIA_URL}${image.url}`}
          alt={image.alternativeText}
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
