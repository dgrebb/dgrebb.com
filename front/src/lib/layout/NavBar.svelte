<script>
  // import NavToggle from "../components/NavToggle.svelte";
  export let navItems;
</script>

<nav class="nav-bar">
  <!-- <NavToggle /> -->
  <ul class="nav-list">
    {#each navItems as { href, title }}
      <li class="nav-item">
        <a class="nav-link" {href}>{title}</a>
      </li>
    {/each}
  </ul>
</nav>
