<script>
  import { themeStorage, themeName, darkTheme, lightTheme } from '@utils';
  import { onMount } from 'svelte';
  import ThemeToggleIcon from './ThemeToggleIcon.svelte';
  import { pokeTrapper } from '@utils/pokeTrapper.js';

  const { themeToggleClick } = pokeTrapper;
  $: theme = '';
  $: dark = null;
  let repeat, timer;

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
    if (repeat || e.repeat) return;
    if (e.detail === 0) {
      repeat = true;
      clearTimeout(timer);
      timer = setTimeout(function() {
        repeat = false;
      }, 1000);
    }
    
    dark = !dark;
    document.documentElement.classList.toggle(darkTheme);
    document.documentElement.classList.toggle(lightTheme);
    themeStorage(dark);
    themeToggleClick(await themeName(dark));
  }
  
</script>

<button type="button" class="theme-toggle" on:click={toggleTheme}>
  <ThemeToggleIcon />
</button>
