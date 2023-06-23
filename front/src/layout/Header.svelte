<script>
  import NavBar from "./NavBar.svelte";
  import NavHome from "./NavHome.svelte";

  import ThemeToggle from "./ThemeToggle.svelte";

  export let navHeading;
  export let navItems;
</script>

<header role="navigation" class="header">
  <a href="#main" class="btn skip-to-content">Skip to Main Content</a>
  <div class="site-title">
    <NavHome {navHeading} />
  </div>
  <ThemeToggle />
  {#if navItems}<NavBar {navItems} />{/if}
</header>
