<script>
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
  import "../styles/global.css";
  import Footer from "../layout/Footer.svelte";
  import Header from "../layout/Header.svelte";

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;
</script>

<Header {navHeading} {navItems} />
<main id="main" class="main">
  <slot />
</main>
<Footer {copyleft} {copyright} />
<PlausibleAnalytics domain="dgrebb.com" enabled={true} outboundLinks={true} />
