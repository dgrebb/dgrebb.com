<script>
  import IconCatchafire from '@components/icons/Catchafire.svelte';
  import IconGitHub from '~icons/mdi/github';
  import IconFacebook from '~icons/mdi/facebook';
  import IconInstagram from '~icons/mdi/instagram';
  import IconSoundCloud from '~icons/ph/soundcloud-logo-bold';
  import IconStackOverflow from '~icons/mdi/stackoverflow';
  import IconLinkedIn from '~icons/entypo-social/linkedin';
  import IconTwitter from '~icons/mdi/twitter';
  import IconX from '~icons/simple-icons/x';
  import IconMastodon from '~icons/mdi/mastodon';
  import IconFlickr from '~icons/icomoon-free/flickr2';
  import IconGoodreads from '~icons/ph/goodreads-logo-fill';
  import IconPinboard from '~icons/typcn/pin-outline';
  import IconLink from '~icons/mdi/external-link';

  /**
   * @typedef {Object} Link
   * @property {string} title - The title of the link.
   * @property {string} url - The URL of the link.
   * @property {string} [icon] - The icon associated with the link.
   */

  /**
   * @typedef {Object} LinkMapItem
   * @property {string} title - The title of the link.
   * @property {string} url - The URL of the link.
   * @property {import('svelte').SvelteComponent} icon - The Svelte component representing the icon.
   * @property {string} linkClass - The CSS class for the link.
   */

  const icons = {
    IconCatchafire,
    IconGitHub,
    IconFacebook,
    IconInstagram,
    IconSoundCloud,
    IconStackOverflow,
    IconLinkedIn,
    IconTwitter,
    IconX,
    IconMastodon,
    IconFlickr,
    IconGoodreads,
    IconPinboard,
    IconLink,
  };

  /**
   * @type {Link[]}
   */
  export let links;

  /**
   * @type {LinkMapItem[]}
   */
  let linkMap = links.map(({ title, url, icon }) => ({
    title,
    url,
    icon: icons[`Icon${icon}`] || IconLink,
    linkClass: icon?.toLowerCase() || 'default',
  }));
</script>

<!--
  @component
  ## Links.svelte

  - Component displaying a list of links with icons.

  ### Example

  ```svelte
  <script>
    import Links from '$lib/components/general/Links.svelte';
  </script>

  <Links {links} />
  ```
-->
<ul aria-label="Links to Dan Grebb on The Internet" class="link-list">
  {#each linkMap as { url, title, linkClass, icon }}
    <li class="link">
      <a
        href={url}
        {title}
        target="_blank"
        rel="me"
        class={`${linkClass}-icon`}
      >
        <svelte:component this={icon} />
      </a>
    </li>
  {/each}
</ul>
