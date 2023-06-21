<script>
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
  import "../styles/global.css";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;
</script>

<span class="flourish" />
<Header {navHeading} {navItems} />
<main id="main" class="main flex flex-col items-center">
  <slot />
</main>
<Footer {copyleft} {copyright} />
<PlausibleAnalytics domain="dgrebb.com" enabled="true" />
