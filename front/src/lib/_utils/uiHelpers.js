export const tocClick = (heading) => {
  return window.location.search?.substring(1) === 'roboto'
    ? false
    : plausible('TOC Click', { props: { heading } });
};

export const categoryClick = (page, category) => {
  return window.location.search?.substring(1) === 'roboto'
    ? false
    : plausible('Category Click', { props: { page, category } });
};

export const relatedClick = (page, title) => {
  return window.location.search?.substring(1) === 'roboto'
    ? false
    : plausible('Related Post Click', { props: { page, title } });
};

export const themeToggleClick = (theme) => {
  return window.location.search?.substring(1) === 'roboto'
    ? false
    : plausible('Theme Toggled', { props: { theme } });
};
