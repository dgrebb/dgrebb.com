<script>
  import { PlausibleAnalytics } from "@accuser/svelte-plausible-analytics";
  import "../styles/global.css";
  import Footer from "../layout/Footer.svelte";
  import Header from "../layout/Header.svelte";
  import Flourish from "../layout/Flourish.svelte";

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;

</script>

<Flourish />
<Header {navHeading} {navItems} />
<main id="main" class="main">
  <slot />
</main>
<slot name="scroll-top" />
<Footer {copyleft} {copyright} />
<PlausibleAnalytics domain="dgrebb.com" enabled={true} outboundLinks={true} />
