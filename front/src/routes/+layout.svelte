<script>
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import Head from "../components/Head.svelte";
  import Flourish from "../layout/Flourish.svelte";
  import Footer from "../layout/Footer.svelte";
  import Header from "../layout/Header.svelte";
  import "../styles/global.css";

  export let data;
  const { navHeading, navItems, copyright, copyleft, seo } = data;

  $: ({ id: route } = $page?.route);
  $: if (browser && route) scrollTop();
</script>

<Flourish />
<Header {navHeading} {navItems} />
<main class="main">
  <slot />
</main>
<slot name="scroll-top" />
<Footer {copyleft} {copyright} />
<PlausibleAnalytics domain="dgrebb.com" enabled={true} outboundLinks={true} />

<Head>
  <meta
    name="viewport"
    content={seo?.metaViewport || "width=device-width, initial-scale=1"}
  />
</Head>