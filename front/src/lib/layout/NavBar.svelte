<script>
  import { page } from '$app/stores';
  // import NavToggle from "../components/NavToggle.svelte";
  export let navItems;
  $: route = $page?.route?.id;
</script>

<nav class="nav-bar" aria-label="Site Pages">
  <!-- <NavToggle /> -->
  <ul class="nav-list">
    {#each navItems as { href, title, childRoutes }}
      {@const active = href === route || childRoutes.includes(route) || false}
      {@const subactive = childRoutes.includes(route) || false}
      <li class="nav-item">
        <a class="nav-link" class:active class:subactive {href}>{title}</a>
      </li>
    {/each}
  </ul>
</nav>
