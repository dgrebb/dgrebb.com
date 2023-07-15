<script>
  import { themeStorage } from "@utils";
  import { onMount } from "svelte";
  import ThemeToggleIcon from "./ThemeToggleIcon.svelte";

  const lightTheme = "light-theme";
  const darkTheme = "dark-theme";
  $: theme = "";
  $: loaded = false;
  $: dark = null;

  onMount(() => {
    loaded = true;
    const storedTheme = themeStorage();
    const themeListener = window.matchMedia("(prefers-color-scheme: dark)");

    if (storedTheme === "true" || storedTheme === "false") {
      dark = storedTheme === "true";
    } else {
      dark = window.matchMedia && themeListener.matches;
      themeStorage(dark);
    }

    theme = dark ? darkTheme : lightTheme;
    document.documentElement.classList = `${theme}`;
    document.body.classList.add("ready");

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", toggleTheme);
  });

  function toggleTheme() {
    dark = !dark;
    document.documentElement.classList.toggle(darkTheme);
    document.documentElement.classList.toggle(lightTheme);
    themeStorage(dark);
  }

  const baseClasses = "theme-toggle";
  $: classList = `${baseClasses} ${loaded ? "opacity-100" : "opacity-0"}`;
</script>

<button class={classList} on:click={toggleTheme}>
  <ThemeToggleIcon />
</button>
