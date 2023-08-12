<script>
  import { themeStorage } from "@utils";
  import { onMount } from "svelte";
  import ThemeToggleIcon from "./ThemeToggleIcon.svelte";

  const lightTheme = "light-theme";
  const darkTheme = "dark-theme";
  $: theme = "";
  $: dark = null;

  onMount(() => {
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

</script>

<button class="theme-toggle" on:click={toggleTheme}>
  <ThemeToggleIcon />
</button>
