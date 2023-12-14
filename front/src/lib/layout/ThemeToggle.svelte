<!-- <script>
  import { themeStorage, themeName, darkTheme, lightTheme } from '@utils';
  import { onMount } from 'svelte';
  import ThemeToggleIcon from './ThemeToggleIcon.svelte';
  import { themeToggleClick } from '@utils/uiHelpers.js';

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
      timer = setTimeout(function () {
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

<button
  type="button"
  class="theme-toggle"
  on:click={toggleTheme}
  title="Switch to {dark ? 'light' : 'dark'} theme"
>
  <ThemeToggleIcon />
</button> -->

<script>
  /**
   * @file ThemeToggle.svelte
   * @description Svelte component for toggling between dark and light themes.
   */
  import { themeStorage, themeName, darkTheme, lightTheme } from '@utils';
  import { onMount } from 'svelte';
  import ThemeToggleIcon from './ThemeToggleIcon.svelte';
  import { themeToggleClick } from '@utils/uiHelpers.js';

  /**
   * Flag indicating whether the theme is dark.
   * @type {boolean}
   */
  $: dark = null;

  /**
   * Flag to prevent rapid toggling.
   * @type {boolean}
   */
  let repeat;

  /**
   * Timer for delaying rapid toggling.
   * @type {number}
   */
  let timer;

  /**
   * Initialize the theme based on stored settings or user preferences.
   * @returns {Promise<void>}
   */
  async function initializeTheme() {
    const storedTheme = themeStorage();
    const themeListener = window.matchMedia('(prefers-color-scheme: dark)');

    if (storedTheme === 'true' || storedTheme === 'false') {
      dark = storedTheme === 'true';
    } else {
      dark = window.matchMedia && themeListener.matches;
      themeStorage(dark);
    }

    const theme = await themeName(dark);
    const htmlElement = document.documentElement;
    htmlElement.classList = `${theme}`;
    document.body.classList.add('ready');

    themeListener.addEventListener('change', toggleTheme);
  }

  /**
   * Toggle between dark and light themes.
   * @param {MouseEvent} e - The click event.
   * @returns {Promise<void>}
   */
  async function toggleTheme(e) {
    if (repeat || e.repeat) return;
    if (e.detail === 0) {
      repeat = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        repeat = false;
      }, 1000);
    }

    dark = !dark;

    const htmlElement = document.documentElement;
    htmlElement.classList.toggle(darkTheme, dark);
    htmlElement.classList.toggle(lightTheme, !dark);

    themeStorage(dark);
    themeToggleClick(await themeName(dark));
  }

  /**
   * Initializer
   */
  onMount(async () => {
    await initializeTheme();
  });
</script>

<!--
 - Svelte component rendering a button for theme toggling.
-->
<button
  type="button"
  class="theme-toggle"
  on:click={toggleTheme}
  title={`Switch to ${dark ? 'light' : 'dark'} theme`}
>
  <ThemeToggleIcon />
</button>
