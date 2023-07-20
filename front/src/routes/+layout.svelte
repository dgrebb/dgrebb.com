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

  const domain =
      {
        production: "dgrebb.com",
        staging: "stg.dgrebb.com",
        local: "local.dgrebb.com",
      }[ENV] || "local.dgrebb.com",
    apiHost = "https://p.dgrebb.com";

  let OGImageProp,
    OGImage,
    OGImageHeight,
    OGImageWidth,
    OGImageAlt,
    twitter = $pageMeta?.metaSocial?.find(
      (obj) => obj.socialNetwork === "Twitter"
    ),
    twitterImageProp,
    twitterImage,
    twitterImageAlt,
    mounted = false;

  $: {
    OGImageProp = $pageMeta?.metaImage?.data?.attributes?.formats || false;
    OGImage = OGImageProp?.large
      ? M + OGImageProp.large?.url
      : $pageMeta.heroImage ||
        "https://s.dgrebb.com/img/default_posts_813772ab64.png";
    OGImageWidth = OGImageProp.large?.width || OGImageProp.medium?.width;
    OGImageHeight = OGImageProp.large?.height || OGImageProp.medium?.height;
    OGImageAlt =
      $pageMeta?.metaImage?.data?.attributes?.alternativeText ||
      "The Circuit of Life";

    twitterImageProp = twitter?.image?.data?.attributes || false;
    twitterImage = twitterImageProp?.formats?.large
      ? M + twitterImageProp?.formats.large?.url
      : $pageMeta?.heroImage ||
        "https://s.dgrebb.com/img/default_posts_813772ab64.png";
    twitterImageAlt =
      twitterImageProp?.alternativeText || "The Circuit of Life";
  }

  onMount(() => {
    mounted = true;
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
  <PlausibleAnalytics {domain} {apiHost} enabled outboundLinks />
{/if}

<MetaTags
  title={$pageMeta?.metaTitle || $pageMeta?.title || "Dan Grebb"}
  titleTemplate={$pageMeta?.titleTemplate}
  description={$pageMeta?.metaDescription ||
    "Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania."}
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
  twitter={{
    site: "@dgrebb",
    creator: "@dgrebb",
    cardType: "summary_large_image",
    title: twitter?.title || $pageMeta.title,
    description: twitter?.description || $pageMeta.description,
    image: twitterImage,
    imageAlt: twitterImageAlt,
  }}
/>
