/**
 * Track a click on a table of contents (TOC) heading.
 * @param {string} heading - The heading that was clicked.
 */
export const tocClick = (heading) => {
  trackPlausible('TOC Click', { heading });
};

/**
 * Track a click on a category.
 * @param {string} page - The page associated with the category click.
 * @param {string} category - The category that was clicked.
 */
export const categoryClick = (page, category) => {
  trackPlausible('Category Click', { page, category });
};

/**
 * Track a click on a related post.
 * @param {string} page - The page associated with the related post click.
 * @param {string} title - The title of the related post that was clicked.
 */
export const relatedClick = (page, title) => {
  trackPlausible('Related Post Click', { page, relatedPostTitle: title });
};

/**
 * Track a theme toggle click.
 * @param {string} theme - The theme that was toggled.
 */
export const themeToggleClick = (theme) => {
  trackPlausible('Theme Toggled', { theme });
};

/**
 * Track a click on the code copy button.
 * @param {string} pageTitle - The title of the page containing the code.
 * @param {string} page - The slug of the page containing the code.
 * @param {string} [codeTitle='Untitled'] - The title of the code being copied.
 * @param {string} componentInstanceID - The unique identifier of the code component instance.
 */
export const codeCopyClick = (
  pageTitle,
  page,
  codeTitle = 'Untitled',
  componentInstanceID
) => {
  trackPlausible('Copied Code', {
    pageTitle,
    page,
    codeTitle,
    codeIdentifier: `code_copy__${page.replace(
      /-/g,
      '_'
    )}__${componentInstanceID}`,
  });
};

/**
 * Track a click on the code copy button.
 * @param {string} altText - The title of the page containing the code.
 * @param {string} page - The slug of the page containing the code.
 */
export const animatedImagePlay = (altText, page) => {
  trackPlausible('Played Animated Image', {
    altText,
    page,
  });
};

/**
 * Track a image popover opens.
 * @param {string} title - The title of the image, if set.
 * @param {string} image - The src of the image.
 * @param {string} page - The slug of the page containing the popover link.
 */
export const popoverImage = (title, image, page) => {
  trackPlausible('Opened Popover Image', {
    title: title ? title : false,
    image,
    page,
  });
};

/**
 * Helper function to track Plausible events.
 * @param {string} eventName - The name of the Plausible event to track.
 * @param {object} props - Additional properties associated with the event.
 */
const trackPlausible = (eventName, props) => {
  if (typeof plausible === 'function') plausible(eventName, { props });
};
