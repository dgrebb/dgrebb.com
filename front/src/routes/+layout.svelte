<script>
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import { scrollTop } from "../_utils";
  import Footer from "../layout/Footer.svelte";
  import Header from "../layout/Header.svelte";
  import Flourish from "../layout/Flourish.svelte";
  import "../styles/global.css";

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;

  $: ({ id: route } = $page?.route);
  $: if (browser && route) scrollTop();
</script>

<Flourish />
<Header {navHeading} {navItems} />
<main class="main">
  <a id="main">You've skipped to the main content area.</a>
  <slot />
</main>
<slot name="scroll-top" />
<Footer {copyleft} {copyright} />
<PlausibleAnalytics domain="dgrebb.com" enabled={true} outboundLinks={true} />
