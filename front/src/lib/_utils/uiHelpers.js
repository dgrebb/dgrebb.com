export const tocClick = (heading) => {
  if (typeof plausible === 'function')
    plausible('TOC Click', { props: { heading } });
};

export const categoryClick = (page, category) => {
  if (typeof plausible === 'function')
    plausible('Category Click', { props: { page, category } });
};

export const relatedClick = (page, title) => {
  if (typeof plausible === 'function')
    plausible('Related Post Click', {
      props: { page, relatedPostTitle: title },
    });
};

export const themeToggleClick = (theme) => {
  if (typeof plausible === 'function')
    plausible('Theme Toggled', { props: { theme } });
};

export const codeCopyClick = (
  pageTitle,
  pageSlug,
  codeTitle = 'Untitled',
  componentInstanceID
) => {
  if (typeof plausible === 'function')
    plausible('Code Copy', {
      props: {
        pageTitle,
        pageSlug,
        codeTitle,
        codeIdentifier: `code_copy__${pageSlug.replace(
          /-/g,
          '_'
        )}__${componentInstanceID}`,
      },
    });
};
