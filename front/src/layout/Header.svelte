<script>
  import NavBar from "./NavBar.svelte";
  import NavHome from "./NavHome.svelte";

  import ThemeToggle from "./ThemeToggle.svelte";

  const light = "light-theme";
  let root;
  let body;
  let darkTheme = "dark-theme";
  let lightTheme = "light-theme";
  $: theme = "";
  $: loaded = false;
  $: dark = null;

  export let navHeading;
  export let navItems;
</script>

<header role="navigation" class="header">
  <a href="#main" class="btn skip-to-content">Skip to Main Content</a>
  <div class="site-title">
    <NavHome {navHeading} />
  </div>
  <ThemeToggle {dark} />
  {#if navItems}<NavBar {navItems} />{/if}
</header>
