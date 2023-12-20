import { PUBLIC_ORIGIN as ORIGIN } from '$env/static/public';
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
export const heading = function (text, level, raw) {
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
  let external, titleAttr, rel;
  const internalPattern = /\/|#|m|t/g;
  external = href.charAt(0).match(internalPattern)
    ? false
    : new URL(href).origin !== ORIGIN
      ? true
      : false;

  let linkTitle = external
    ? title
      ? title
      : extractDomainWithoutWWW(href)
    : title;

  titleAttr = linkTitle ? `title="${linkTitle}"` : '';
  rel = external ? 'rel="nofollow noopener noreferrer"' : '';

  return `<a href="${href}" ${titleAttr} ${rel}>${text}</a>`;
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
  const match = /\{ align=(left|right) \}/.exec(text);
  const alignment = match ? match[1] : null;
  const cleanText = text
    ? text.replace(/\{ align=(left|right) \}/, '').trim()
    : '';
  const imageTitle = title !== null ? `title="${title}"` : '';

  return `<img src="${href}" src="${href}" alt="${cleanText}" ${imageTitle} style="float: ${alignment};" />`;
};
