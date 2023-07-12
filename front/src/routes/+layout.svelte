<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { PUBLIC_ENV } from "$env/static/public";
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import { onMount } from "svelte";
  import { scrollTop } from "../_utils/index.js";
  import Head from "../components/Head.svelte";
  import Flourish from "../layout/Flourish.svelte";
  import Footer from "../layout/Footer.svelte";
  import Header from "../layout/Header.svelte";
  import "../styles/global.css";

  export let data;
  const { navHeading, navItems, copyright, copyleft, seo } = data;

  let anchor = true;
  $: ({ id: route } = $page?.route);
  $: if (browser) anchor = window.location.hash || false;
  $: if (browser && route && !anchor) scrollTop();

  const domain =
    {
      production: "dgrebb.com",
      staging: "stg.dgrebb.com",
      local: "local.dgrebb.com",
    }[PUBLIC_ENV] || "local.dgrebb.com";

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
    content={seo?.metaViewport || "width=device-width, initial-scale=1"}
  />
</Head>
