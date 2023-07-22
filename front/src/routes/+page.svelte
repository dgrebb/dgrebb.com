<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import Image from "@components/Image.svelte";
  import Links from "@components/Links.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import Meta from "@components/Meta.svelte";
  import Link from "@components/content/renderers/Link.svelte";
  import Flourish from "@layout/Flourish.svelte";
  import SvelteMarkdown from "svelte-markdown";

  export let data;
  const { seo, headline, bioPicture, intro, links, pathname } = data;
  const image = bioPicture?.data?.attributes?.formats?.small || {
    url: "/bio.jpg",
    alternativeText: "A picture of Dan smiling",
  };
  
  $: pageMeta = {
    ...seo,
    title: seo.metaTitle,
    type: "website",
    metaImage: M + seo?.metaImage?.data?.attributes?.url || M + image.url,
  };
</script>

<PageTransition {pathname}>
  <section class="bio text-center">
    <Flourish />
    {#if image}
      <Image
        src={M + image.url}
        alt={image.alternativeText}
        title="Hi!"
        classes="bio-picture"
        ariaHidden={true}
      />
      <noscript>
        <img
          src={M + image.url}
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

<Meta {pageMeta} />