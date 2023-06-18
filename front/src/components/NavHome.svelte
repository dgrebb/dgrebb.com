<script>
  import { onMount } from 'svelte';
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

  onMount(async () => {
    loaded = true;
    const themeListener = window.matchMedia('(prefers-color-scheme: dark)');
    window.matchMedia && themeListener.matches
    ? dark = true
    : dark = false;
    theme = dark ? darkTheme : lightTheme;
    root = document.getElementsByTagName("html")[0];
    body = document.body;

    root.classList = `${theme}`;
    body.classList.add("ready");
  });

  function toggleTheme(e) {
    dark = !dark;
    root.classList.toggle(darkTheme);
    root.classList.toggle(lightTheme);
    body.classList.toggle(darkTheme);
    body.classList.toggle(lightTheme);
  }

  const baseClasses = "theme-toggle ml-2 "
  $: classList = `${baseClasses} ${loaded ? "opacity-100" : "opacity-0"}`;

</script>

<a class="nav-home font-black text-2xl leading-none" href="/">
  <h1>{navHeading}</h1>
</a>
<button class={classList} on:click={toggleTheme}>
  <ThemeToggle {dark} />
</button>
