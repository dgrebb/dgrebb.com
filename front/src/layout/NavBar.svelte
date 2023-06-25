<script>
  export let navItems;
</script>

<nav class="nav-bar">
  <ul>
    {#each navItems as navItem}
      <li class="nav-item">
        <a
          class="btn"
          href={navItem.href}
        >
          {navItem.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
