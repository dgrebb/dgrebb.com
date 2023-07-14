<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { PUBLIC_ENV as ENV, PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import Flourish from "@layout/Flourish.svelte";
  import Footer from "@layout/Footer.svelte";
  import Header from "@layout/Header.svelte";
  import { pageMeta } from "@store";
  import "@styles/global.css";
  import { scrollTop } from "@utils";
  import { onMount } from "svelte";
  import { MetaTags } from "svelte-meta-tags";

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;

  let anchor = true;
  let { id: route } = $page?.route;
  if (browser) anchor = window.location.hash || false;
  if (browser && route && !anchor) scrollTop();

  const domain = {
    production: "dgrebb.com",
    staging: "stg.dgrebb.com",
    local: "local.dgrebb.com",
  }[ENV] || "local.dgrebb.com";

  const apiHost = "https://p.dgrebb.com";

  let mounted = false;
  let theme = "unknown";

  $: OGImageProp = $pageMeta?.metaImage?.data?.attributes?.formats || false;
  $: OGImage = OGImageProp?.large ? M + OGImageProp.large?.url : $pageMeta.heroImage || "https://s.dgrebb.com/img/default_banner_2a50e43220.png";
  $: OGImageWidth = OGImageProp.large?.width || OGImageProp.medium?.width;
  $: OGImageHeight = OGImageProp.large?.height || OGImageProp.medium?.height;
  $: OGImageAlt = $pageMeta?.metaImage?.data?.attributes?.alternativeText || "A photo of Dan smiling";

  let twitter = $pageMeta?.metaSocial?.find(obj => obj.socialNetwork === "Twitter");
  let twitterImage, twitterImageAlt;
  $: if (twitter) {
    twitterImage = twitter.image?.data?.attributes?.formats.large?.url || false;
    twitterImageAlt = twitter?.data?.attributes?.alternativeText || "A photo of Dan smiling";
  }

  onMount(() => {
    mounted = true;
    theme = document.querySelector("html").classList.contains("dark-theme") ? "dark" : "light";
  });
</script>

<Flourish />
<Header {navHeading} {navItems} />
<main class="main">
  <slot />
</main>
<slot name="scroll-top" />
<Footer {copyleft} {copyright} />

{#if mounted}
  <PlausibleAnalytics
    {domain}
    {apiHost}
    enabled
    outboundLinks
    pageviewprops={{ theme }}
  />
{/if}

<MetaTags
  title={$pageMeta?.metaTitle || $pageMeta?.title || "Dan Grebb"}
  titleTemplate={$pageMeta?.titleTemplate}
  description={$pageMeta?.metaDescription || "Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania."}
  robots={$pageMeta?.metaRobots || undefined}
  canonical={$pageMeta.canonicalURL}
  additionalMetaTags={[
    {
      name: "viewport",
      content: $pageMeta?.metaViewport || "width=device-width, initial-scale=1",
    },
    {
      name: "keywords",
      content: $pageMeta?.keywords || false,
    },
  ]}
  openGraph={{
    title: $pageMeta.title,
    description: $pageMeta.metaDescription,
    url: $pageMeta.canonicalURL,
    type: $pageMeta.type === "post" ? "article" : "website",
    article: $pageMeta.type === "post" && {
      publishedTime: $pageMeta.publishedAt,
      modifiedTime: $pageMeta.updatedAt,
    },
    images: [
      {
        url: OGImage,
        width: OGImageWidth || 1600,
        height: OGImageHeight || 900,
        alt: OGImageAlt,
      },
    ],
  }}
  twitter={twitter && {
    site: "@dgrebb",
    creator: "@dgrebb",
    cardType: "summary_large_image",
    title: twitter.title,
    description: twitter.description,
    image: twitterImage ? M + twitterImage : "https://s.dgrebb.com/img/default_banner_2a50e43220.png",
    imageAlt: twitterImageAlt || "A photo of Dan smiling",
  }}
/>
