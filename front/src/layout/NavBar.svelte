<script>
  // import NavToggle from "../components/NavToggle.svelte";
  export let navItems;
</script>

<nav class="nav-bar">
  <!-- <NavToggle /> -->
  <ul class="nav-list">
    {#each navItems as navItem}
      <li class="nav-item">
        <a
          class="nav-link"
          href={navItem.href}
        >
          {navItem.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
