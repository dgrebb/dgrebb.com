<script>
  export let navItems;
</script>

<nav class="nav-bar">
  <ul>
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
