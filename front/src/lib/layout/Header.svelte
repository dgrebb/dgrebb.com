<script>
  import NavBar from './NavBar.svelte';
  import NavHome from './NavHome.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  export let navHeading;
  export let navItems;
</script>

<header class="header" id="header">
  <a href="#main" class="btn skip-to-content">Skip to Main Content</a>
  <div class="site-title">
    <NavHome {navHeading} />
  </div>
  {#if navItems}<NavBar {navItems} />{/if}
  <ThemeToggle />
</header>
