<script>
  import { PUBLIC_MEDIA_URL } from "$env/static/public";
  import { MetaTags } from "svelte-meta-tags";
  import Image from "../components/Image.svelte";
  import Links from "../components/Links.svelte";
  import SvelteMarkdown from 'svelte-markdown'
  import Head from "../components/Head.svelte";
  export let data;
  const { seo, headline, intro, links } = data;
  const image = seo?.metaImage?.data?.attributes.formats.small || { url: "/bio.png", alt: "A picture of Dan smiling" };
  const metaSocialOG = seo?.metaSocial.find((obj) => obj.socialNetwork === "Facebook");
</script>

<section class="bio text-center">
  {#if image}
    <Image
      src={`${PUBLIC_MEDIA_URL}${image.url}`}
      alt={image.alternativeText}
      title="Hi!"
      width={120}
      height={120}
      classes="m-auto rounded-full"
    />
  {/if}
  <h1 class="headline">{headline}</h1>
  <SvelteMarkdown source={intro} />
</section>
{#if links.length}
  <section class="links">
    <Links {links} />
  </section>
{/if}

<Head>
  <meta name="viewport" content={seo.metaViewport} />
  <meta name="thumbnail" content={`${PUBLIC_MEDIA_URL}${image.url}`} />
</Head>

<MetaTags
  title={seo.metaTitle}
  description={seo.metaDescription}
  openGraph={{
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
  }}
/>
