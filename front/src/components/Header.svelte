<script>
  import NavBar from "./NavBar.svelte";
  import NavHome from "./NavHome.svelte";
  export let navHeading;
  export let navItems;
</script>

<header role="navigation" class="header flex items-center">
  <a href="#main" class="btn skip-to-content">Skip to Main Content</a>
  <div class="title flex flex-grow">
    <NavHome navHeading="{navHeading}" />
  </div>
  {#if navItems}<NavBar navItems={navItems} />{/if}
</header>