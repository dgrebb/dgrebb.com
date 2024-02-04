<script>
  import { PATHS } from '$lib/CONSTANTS';
  const {
    one: { post: postPath, category: categoryPath },
    many: { posts: postsPath },
  } = PATHS;
  import { page } from '$app/stores';
  import { PUBLIC_ENV as ENV } from '$env/static/public';
  import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
  import Footer from '@layout/Footer.svelte';
  import Header from '@layout/Header.svelte';
  import '@styles/global.css';
  import { onMount } from 'svelte';

  export let data;
  const { navHeading, navItems, copyright, copyleft } = data;

  $: route = $page.route.id;
  let mounted = false;
  let isAutomation;
  $: secondary =
    route === `${categoryPath}/[category]` ||
    route === `${postPath}/[slug]` ||
    route === `${postsPath}`;
  $: post = $page.route.id === `${postPath}/[slug]`;

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
  });
</script>

<span class="flourish" />
<Header {navHeading} {navItems} {route} />
<!-- svelte-ignore a11y-no-redundant-roles -->
<main
  class="main"
  class:secondary
  class:l-post={post}
  data-sveltekit-noscroll
  role="main"
>
  <slot />
</main>

<!-- svelte-ignore a11y-unknown-role -->
<footer
  class="footer"
  class:footer-secondary={secondary}
  data-sveltekit-noscroll
  role="footer"
>
  <Footer {copyleft} {copyright} />
</footer>

{#if mounted && !isAutomation}
  {#key route}
    <PlausibleAnalytics
      {domain}
      {apiHost}
      enabled
      outboundLinks
      pageviewProps={{
        theme: document.documentElement.classList.toString(),
      }}
    />
  {/key}
{/if}
