<script>
  import { page } from '$app/stores';
  // import NavToggle from "../components/NavToggle.svelte";
  export let navItems;
  $: postsActive = $page?.route?.id?.includes('post') || false;
  $: subactive =
    $page?.route?.id === '/post/[slug]' ||
    $page?.route?.id === '/posts/category/[category]' ||
    false;
</script>

<nav class="nav-bar" aria-label="Site Pages">
  <!-- <NavToggle /> -->
  <ul class="nav-list">
    {#each navItems as { href, title }}
      <li class="nav-item">
        <a class="nav-link" class:active={postsActive} class:subactive {href}
          >{title}</a
        >
      </li>
    {/each}
  </ul>
</nav>
