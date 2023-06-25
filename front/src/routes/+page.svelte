<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import SvelteMarkdown from 'svelte-markdown';
  import { MetaTags } from "svelte-meta-tags";
  import Head from "../components/Head.svelte";
  import Image from "../components/Image.svelte";
  import Links from "../components/Links.svelte";
  import Link from "../components/markdown/Link.svelte";
  import Flourish from "../layout/Flourish.svelte";

  export let data;
  const { seo, headline, intro, links } = data;
  const image = seo?.metaImage?.data?.attributes.formats.small || { url: "/bio.jpg", alt: "A picture of Dan smiling" };
  const metaSocialOG = seo?.metaSocial.find((obj) => obj.socialNetwork === "Facebook");
</script>

<section class="bio text-center">
  <Flourish />
  {#if image}
    <Image
      src={`${PUBLIC_MEDIA_URL}${image.url}`}
      alt={image.alternativeText}
      title="Hi!"
      classes="bio-picture"
      aria-hidden={true}
    />
    <noscript>
      <img
        src={`${PUBLIC_MEDIA_URL}${image.url}`}
        alt={image.alternativeText}
        title="Hi!"
        classes="bio-picture"
        aria-hidden={true}
      />
    </noscript>
  {/if}
  <h1 class="headline">{headline}</h1>
  <SvelteMarkdown renderers={{ link: Link }} source={intro} />
</section>
{#if links.length}
  <section class="links">
    <Links {links} />
  </section>
{/if}

<Head>
  <meta
    name="viewport"
    content={seo?.metaViewport || "width=device-width, initial-scale=1"}
  />
  <meta name="thumbnail" content={`${PUBLIC_MEDIA_URL}${image.url}`} />
</Head>

<MetaTags
  title={seo.metaTitle || "Dan Grebb"}
  description={seo.metaDescription || "Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania."}
  openGraph={metaSocialOG?.image
    ? {
        images: [
          {
            url: `${PUBLIC_MEDIA_URL}${metaSocialOG.image.data.attributes.url}`,
            width: 1600,
            height: 900,
            alt: metaSocialOG.image.data.attributes.alternativeText,
          },
          {
            url: `${PUBLIC_MEDIA_URL}${metaSocialOG.image.data.attributes.formats.medium.url}`,
            width: 800,
            height: 600,
            alt: metaSocialOG.image.data.attributes.alternativeText,
          },
        ],
      }
    : null}
/>
