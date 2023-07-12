<script>
  import IconCatchafire from "./icons/Catchafire.svelte";
  import * as Icons from "~icons/mdi";
  import * as SocialIcons from "~icons/ph";
  import * as EntypoIcons from "~icons/entypo-social";
  import * as IcomoonIcons from "~icons/icomoon-free";
  import * as TypcnIcons from "~icons/typcn";
  import IconLink from "~icons/mdi/external-link";

  const icons = {
    IconCatchafire,
    ...Icons,
    ...SocialIcons,
    ...EntypoIcons,
    ...IcomoonIcons,
    ...TypcnIcons,
    IconLink,
  };

  export let links;

  let linkMap = links.map(({ title, url, icon }) => ({
    title,
    url,
    icon: icons[`Icon${icon}`],
    linkClass: icon?.toLowerCase() || "",
  }));
</script>

<ul
  role="complementary"
  aria-label="Links to Dan Grebb on The Internet"
  class="link-list"
>
  {#each linkMap as { url, title, linkClass, icon }, i}
    <li class="link">
      <a
        href={url}
        {title}
        target="_blank"
        rel="noopener noreferrer"
        class={`${linkClass}-icon`}
      >
        <svelte:component this={icon || IconLink} />
      </a>
    </li>
  {/each}
</ul>
