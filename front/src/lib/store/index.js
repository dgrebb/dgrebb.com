import { writable } from 'svelte/store';

export const pageMeta = writable({ titleTemplate: false });
export const popover = writable({
  show: false,
  title: 'Whoops!',
  content: `<p>...there's nothing here.</p>`,
});
