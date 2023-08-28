export const tocClick = (heading) =>
  plausible('TOC Click', { props: { heading } });

export const categoryClick = (page, category) =>
  plausible('Category Click', { props: { page, category } });

export const relatedClick = (page, title) =>
  plausible('Related Post Click', { props: { page, title } });

export const themeToggleClick = (theme) =>
  plausible('Theme Toggled', { props: { theme } });
