<script>
  import { page } from '$app/stores';
  import { PUBLIC_ENV as ENV } from '$env/static/public';
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
  import Flourish from '@layout/Flourish.svelte';
  import Footer from '@layout/Footer.svelte';
  import Header from '@layout/Header.svelte';
  import '@styles/global.css';
  import { onMount } from 'svelte';
  // import { themeName } from '@utils';

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;
  const route = $page.route.id;
  let theme = null;
  $: secondary =
    $page.route.id === '/posts/category/[category]' ||
    $page.route.id === '/post/[slug]' ||
    $page.route.id === '/posts';

  const domain =
      {
        production: 'dgrebb.com',
        staging: 'stg.dgrebb.com',
        local: 'local.dgrebb.com',
      }[ENV] || 'local.dgrebb.com',
    apiHost = 'https://p.dgrebb.com';

  let mounted = false;

  onMount(async () => {
    // theme = await themeName(JSON.parse(window.localStorage.getItem("dgd")));
    mounted = true;
  });
</script>

<Flourish />
<Header {navHeading} {navItems} />
<main class="main" class:main-secondary={secondary} data-sveltekit-noscroll>
  <slot />
</main>
<!-- <slot name="scroll-top" /> -->

<footer class="footer" class:footer-secondary={secondary} data-sveltekit-noscroll>
  <Footer {copyleft} {copyright} />
</footer>

{#if mounted}
  <PlausibleAnalytics {domain} {apiHost} enabled outboundLinks />
{/if}
