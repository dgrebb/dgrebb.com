export const darkTheme = 'dark-theme';
export const lightTheme = 'light-theme';

/**
 * Manages theme preference in local storage.
 * @param {boolean} dark - Theme preference (optional).
 * @returns {boolean | undefined} - Theme preference if retrieved, otherwise false.
 */
export const themeStorage = (dark) => {
  const key = 'dgd';
  if (dark !== undefined) {
    localStorage.setItem(key, dark);
  } else {
    const storedValue = localStorage.getItem(key);
    return storedValue && storedValue !== 'null' && storedValue !== 'undefined'
      ? storedValue
      : false;
  }
};

export const themeName = async function (preference) {
  return preference ? darkTheme : lightTheme;
};

export const scrollTop = function (e) {
  e?.preventDefault();
  document.getElementById('header')?.scrollIntoView();
};

/**
 * Check if the given element is entirely outside the viewport.
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - True if the element is outside the viewport, false otherwise.
 */
export const isElementOutsideViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
};

/**
 * Determine if a browser/system setting prefers reduced motion
 * @returns boolean
 */
export const motionless = function () {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Extracts the domain from a URL without the 'www' prefix.
 *
 * @param {string} url - The URL from which to extract the domain.
 * @returns {string|null} The extracted domain without 'www' or null if no match is found.
 */
export const extractDomainWithoutWWW = function (url) {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^/]+)/;

  const match = url.match(domainRegex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
