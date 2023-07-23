<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { PUBLIC_ENV as ENV } from "$env/static/public";
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import Flourish from "@layout/Flourish.svelte";
  import Footer from "@layout/Footer.svelte";
  import Header from "@layout/Header.svelte";
  import "@styles/global.css";
  // import { scrollTop } from "@utils";
  import { onMount } from "svelte";

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;

  // let anchor = true;
  // let { id: route } = $page?.route;
  // if (browser) anchor = window.location.hash || false;
  // if (browser && route && !anchor) scrollTop();

  const domain =
      {
        production: "dgrebb.com",
        staging: "stg.dgrebb.com",
        local: "local.dgrebb.com",
      }[ENV] || "local.dgrebb.com",
    apiHost = "https://p.dgrebb.com";

  let mounted = false;

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
