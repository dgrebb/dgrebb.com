<script>
  import { themeStorage, themeName, darkTheme, lightTheme } from '@utils';
  import { onMount } from 'svelte';
  import ThemeToggleIcon from './ThemeToggleIcon.svelte';
  import { pokeTrapper } from '@utils/pokeTrapper.js';

  const { themeToggleClick } = pokeTrapper;
  $: theme = '';
  $: dark = null;

  onMount(async () => {
    const storedTheme = themeStorage();
    const themeListener = window.matchMedia('(prefers-color-scheme: dark)');

    if (storedTheme === 'true' || storedTheme === 'false') {
      dark = storedTheme === 'true';
    } else {
      dark = window.matchMedia && themeListener.matches;
      themeStorage(dark);
    }

    theme = await themeName(dark);
    document.documentElement.classList = `${theme}`;
    document.body.classList.toggle('ready', true);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', toggleTheme);
  });

  async function toggleTheme(e) {
    if (e.repeat) return;
    dark = !dark;
    document.documentElement.classList.toggle(darkTheme);
    document.documentElement.classList.toggle(lightTheme);
    themeStorage(dark);
    themeToggleClick(await themeName(dark));
  }
</script>

<button class="theme-toggle" on:click={toggleTheme} on:keydown={toggleTheme}>
  <ThemeToggleIcon />
</button>
