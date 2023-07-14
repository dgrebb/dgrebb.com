<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { PUBLIC_ENV as ENV, PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import Head from "@components/Head.svelte";
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

  $: metaSocialOG =
    $pageMeta?.metaSocial?.find((obj) => obj.socialNetwork === "Facebook") ||
    false;

  $: console.log($pageMeta);

  let anchor = true;
  $: ({ id: route } = $page?.route);
  $: if (browser) anchor = window.location.hash || false;
  $: if (browser && route && !anchor) scrollTop();

  const domain =
    {
      production: "dgrebb.com",
      staging: "stg.dgrebb.com",
      local: "local.dgrebb.com",
    }[ENV] || "local.dgrebb.com";

  const apiHost = "https://p.dgrebb.com";

  let mounted = false;
  let theme = "unknown";

  onMount(() => {
    mounted = true;
    theme = document.querySelector("html").classList.contains("dark-theme")
      ? "dark"
      : "light";
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

<Head>
  <meta
    name="viewport"
    content={$pageMeta?.metaViewport || "width=device-width, initial-scale=1"}
  />
  <meta name="robots" content={$pageMeta?.metaRobots || "index,follow"} />
  <meta name="googlebot" content={$pageMeta?.metaRobots || "index,follow"} />
</Head>

<MetaTags
  title={$pageMeta?.metaTitle || $pageMeta?.title ||  "Dan Grebb"}
  titleTemplate={$pageMeta?.titleTemplate}
  description={$pageMeta?.metaDescription ||
    "Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania."}
  openGraph={metaSocialOG?.image
    ? {
        images: [
          {
            url: `${M + metaSocialOG.image.data.attributes.url}`,
            width: 1600,
            height: 900,
            alt: metaSocialOG.image.data.attributes.alternativeText,
          },
          {
            url: `${M + metaSocialOG.image.data.attributes.formats.medium.url}`,
            width: 800,
            height: 600,
            alt: metaSocialOG.image.data.attributes.alternativeText,
          },
        ],
      }
    : null}
/>
