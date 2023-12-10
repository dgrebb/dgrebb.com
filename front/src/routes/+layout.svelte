<script>
  import { page } from '$app/stores';
  import {
    PUBLIC_ENV as ENV,
    PUBLIC_RELEASE,
    PUBLIC_SENTRY_DSN,
  } from '$env/static/public';
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
  import Flourish from '@layout/Flourish.svelte';
  import Footer from '@layout/Footer.svelte';
  import Header from '@layout/Header.svelte';
  import '@styles/global.css';
  import { onMount } from 'svelte';

  export let data;
  let init, BrowserTracing;
  const { navHeading, navItems, copyright, copyleft } = data;
  $: route = $page.route.id;
  let mounted = false;
  let isAutomation;
  $: secondary =
    route === '/posts/category/[category]' ||
    route === '/post/[slug]' ||
    route === '/posts';
  $: post = $page.route.id === '/post/[slug]';

  const domain =
      {
        production: 'dgrebb.com',
        staging: 'stg.dgrebb.com',
        local: 'local.dgrebb.com',
      }[ENV] || 'local.dgrebb.com',
    apiHost = 'https://p.dgrebb.com';

  onMount(async () => {
    var qs = window.location.search || '';
    qs = qs.substring(1);
    isAutomation = qs === 'roboto' ? true : false;
    mounted = true;

    ({ init, BrowserTracing } = await import('@sentry/browser'));
    init({
      dsn: PUBLIC_SENTRY_DSN,
      release: PUBLIC_RELEASE,
      debug: ENV === 'development' ? false : false,
      environment: ENV,
      integrations: [new BrowserTracing()],
      normalizeDepth: 0,
      beforeSend(event) {
        if (event.user) {
          delete event.user;
        }
        if (event.server_name) {
          delete event.server_name;
        }
        return event;
      },
    });
  });
</script>

<Flourish />
<Header {navHeading} {navItems} />
<main class="main" class:secondary class:l-post={post} data-sveltekit-noscroll>
  <slot />
</main>

<footer
  class="footer"
  class:footer-secondary={secondary}
  data-sveltekit-noscroll
>
  <Footer {copyleft} {copyright} />
</footer>

{#if mounted && !isAutomation}
  <PlausibleAnalytics {domain} {apiHost} enabled outboundLinks />
{/if}
