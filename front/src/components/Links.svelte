<script>
  import Icon from '@iconify/svelte';
  import Catchafire from './icons/Catchafire.svelte';

  const Icons = {
    GitHub: "line-md:github-loop",
    Facebook: "line-md:facebook",
    Instagram: "line-md:instagram",
    SoundCloud: "ph:soundcloud-logo-bold",
    StackOverflow: "mdi:stackoverflow",
    LinkedIn: "line-md:linkedin",
    Twitter: "line-md:twitter",
    Mastodon: "line-md:mastodon",
    Flickr: "icomoon-free:flickr2",
    Goodreads: "ph:goodreads-logo-bold",
    Pinboard: "typcn:pin-outline",
    Link: "line-md:external-link",
  };

  export let links;

  let linkMap = [];
  links.map((link) => {
    const { title, url, icon } = link;
    linkMap.push(
      {
        title,
        url,
        icon,
        linkClass: icon?.toLowerCase() || ""
      }
    )
  });

</script>

<ul
  role="complementary"
  aria-label="Links to Dan Grebb on The Internet"
  class="link-list"
>
  {#each linkMap as link}
    <li class="link">
      <a
        href={link.url}
        title={link.title}
        target="_blank"
        rel="noopener noreferrer"
        class={`${link.linkClass}-icon inline-block h-full p-1`}
      >
        {#if link.icon === "Catchafire"}
          <Catchafire />
        {:else}
          <Icon icon={Icons[link.icon ? link.icon : "Link"]} />
        {/if}
      </a>
    </li>
  {/each}
</ul>
