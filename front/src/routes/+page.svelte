<script>
  import { MetaTags } from "svelte-meta-tags";
  import Image from "../components/Image.svelte";
  import Links from "../components/Links.svelte";
  import SvelteMarkdown from 'svelte-markdown'
  import Head from "../components/Head.svelte";
  export let data;
  const { headshot, headline, intro, links } = data;
  const image = headshot?.data?.attributes.formats.thumbnail || false;
  const alt = headshot?.data?.attributes.alternativeText;
</script>

<section class="bio text-center">
  {#if image}
    <Image
      src={image.url}
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
  <meta
    name="thumbnail"
    content="https://stg.s.dgrebb.com/img/bio_164dda2bdc.jpg"
  />
</Head>

<MetaTags
  title="Dan Grebb"
  description="Dan Grebb is a versatile and accomplished individual with a passion for innovation and creative problem-solving. Dan is an invaluable asset to any organization seeking a dynamic and forward-thinking professional."
  openGraph={{
    images: [
      {
        url: "https://stg.s.dgrebb.com/img/default_banner_8464dc0d50.png",
        width: 1600,
        height: 900,
        alt: "The Circuit of Life",
      },
      {
        url:
          "https://stg.s.dgrebb.com/img/circuit_of_life_800x600_f0b453b8f9.png",
        width: 800,
        height: 600,
        alt: "The Circuit of Life",
      },
    ],
  }}
/>
