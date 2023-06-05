<script>
  export let navItems;
</script>

<nav class="nav-bar flex-shrink">
  <ul class="justify-end">
    {#each navItems as navItem}
      <li class="inline mx-3 last:mr-0">
        <a
          class="btn font-semibold py-2 px-4 rounded shadow align-text-bottom"
          href={navItem.href}
        >
          {navItem.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
