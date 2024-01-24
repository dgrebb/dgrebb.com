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
 * @param {string} url The URL from which to extract the domain.
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

/**
 * Copies text inside the clicked DOM node
 *
 * @param {Event} e The event which triggered the copy.
 * @returns {Clipboard.writeText} Text is written to the system clipboard.
 *
 * @async
 *
 * ## Example:
 * ```javascript
 * const codes = document.querySelectorAll('code');
 * codes.forEach(function (code) {
 *   code.addEventListener('click', function (e) {
 *     copyText(e);
 *   });
 * });
 * ```
 */
export async function copyText(e) {
  const text = e.target.innerHTML;
  if (e.type === 'click' || e.code === 'Enter' || e.code === 'Space') {
    try {
      await navigator.clipboard.writeText(text);
      // Handle success, e.g., show a notification
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
      // Handle the error, e.g., show an error message
    }
  }
}

/**
 * Calculates and returns a high-contrast color (either black or white)
 * for optimal readability when displayed on top of the provided color.
 * The function uses the luminance formula to determine the brightness
 * of the input color and returns either black or white based on a
 * luminance threshold.
 *
 * @param {string} hexColor - The hex code of the background color.
 *                            Should be a valid hex color code starting with '#'
 *                            and followed by six hexadecimal characters.
 * @returns {string} A hex code ('#000000' for black or '#FFFFFF' for white)
 *                   representing the high-contrast color.
 *
 * @example
 * // returns '#000000'
 * getHighContrastHexColor("#00FF00");
 *
 * @example
 * // returns '#FFFFFF'
 * getHighContrastHexColor("#0000FF");
 */
export const getHighContrastHexColor = function getHighContrastHexColor(
  hexColor
) {
  // Convert hex color to RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Return high contrast color
  return luminance > 186 ? '#000000' : '#FFFFFF'; // 186 is a commonly used threshold
};

/**
 * Converts a hexadecimal color value to its RGB representation in string format.
 *
 * @param {string} hex - The hexadecimal color string to convert. It can optionally start with '#'.
 * @returns {string|null} A string representing the red (r), green (g), and blue (b)
 *                        RGB values separated by commas, each as integers in the range 0-255.
 *                        Returns null if the input is not a valid hexadecimal color string.
 *
 * @example
 * // returns "255, 255, 255"
 * getRGBFromHex("#ffffff");
 *
 * @example
 * // returns "0, 0, 0"
 * getRGBFromHex("000000");
 *
 * @example
 * // returns null
 * getRGBFromHex("#zzz");
 */
export const getRGBFromHex = function getRGBFromHex(hex) {
  if (!/^#?([a-f\d]{6})$/i.test(hex)) {
    return null;
  }
  const hexNormalized = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(hexNormalized.substring(0, 2), 16);
  const g = parseInt(hexNormalized.substring(2, 4), 16);
  const b = parseInt(hexNormalized.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};
