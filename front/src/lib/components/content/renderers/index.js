import { ORIGIN as ORIGIN } from '$env/static/private';
import slugger from 'slugger';
import { extractDomainWithoutWWW } from '@utils';

/**
 * @function
 * @name heading
 *
 * @param {string} text The heading text
 * @param {number} level The heading level
 * @returns A heading with offset level, anchor id, and anchor link
 */
export const heading = function (text, level) {
  let depth = level + 1;

  return `<h${depth} class="post-heading">
      ${text}
    </h${depth}>`;
};

/**
 * @function
 * @name anchorHeading
 *
 * @param {string} text The heading text
 * @param {number} level The heading level
 * @returns A heading with offset level, anchor id, and anchor link
 */
export const anchorHeading = function (text, level, raw) {
  const id = slugger(raw);
  let depth = level + 1;

  return `<h${depth} id="${id}" class="post-heading">
      <a
        href="#${id}"
        class="heading-anchor-link"
        aria-label="Copy link to the &ldquo;${text}&rdquo; section">#</a
      >
      ${text}
    </h${depth}>`;
};

/**
 * @function
 * @name link
 *
 * @param {string} href The anchor href
 * @param {string} title The anchor title
 * @param {string} text The anchor text
 * @returns An anchor with title and rel attributes set based on external domain
 */
export const link = function (href, title, text) {
  let external, image, classes, titleAttr, rel;
  const internalPattern = /\/|#|m|t/g;
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;

  external = href.charAt(0).match(internalPattern)
    ? false
    : new URL(href).origin !== ORIGIN
      ? true
      : false;
  image = imageExtensions.test(href);

  let linkTitle = external
    ? title
      ? title
      : extractDomainWithoutWWW(href)
    : title;

  titleAttr = linkTitle ? `title="${linkTitle}"` : '';
  rel = external ? 'rel="nofollow noopener noreferrer"' : '';
  classes = external ? 'external ' : '';
  classes += image ? 'popover--image ' : '';
  classes = classes.trim();

  return `<a href="${href}" class="${classes}" ${titleAttr} ${rel}>${text}</a>`;
};

/**
 * @function
 * @name image
 *
 * @param {string} href The anchor href
 * @param {string} title The image title attribute value
 * @param {string} text The image alt text
 * @returns An anchor with title and rel attributes set based on external domain
 */
export const image = function (href, title, text) {
  const match = /\{ align=(left|right|center) \}/.exec(text);
  const alignment = match ? match[1] : null;
  const cleanText = text
    ? text.replace(/\{ align=(left|right|center) \}/, '').trim()
    : '';
  const imageTitle = title !== null ? `title="${title}"` : '';

  return `<img src="${href}" src="${href}" alt="${cleanText}" ${imageTitle} loading="lazy" class="post-image--${alignment}" />`;
};
