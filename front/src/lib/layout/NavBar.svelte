<script>
  import { page } from "$app/stores";
  // import NavToggle from "../components/NavToggle.svelte";
  export let navItems;
  $: postsActive = $page.route.id.includes("post");
</script>

<nav class="nav-bar">
  <!-- <NavToggle /> -->
  <ul class="nav-list">
    {#each navItems as { href, title }}
      <li class="nav-item">
        <a class={`nav-link ${postsActive ? "active" : ""}`} {href}>{title}</a>
      </li>
    {/each}
  </ul>
</nav>
