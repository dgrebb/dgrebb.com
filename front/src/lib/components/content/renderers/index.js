import { PUBLIC_ORIGIN as ORIGIN } from '$env/static/public';
import slugger from 'slugger';

/**
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
 *
 * @param {string} href The anchor href
 * @param {string} title The anchor title
 * @param {string} text The anchor text
 * @returns An anchor with title and rel attributes set based on external domain
 */
export const link = function (href, title, text) {
  const internalPattern = /\/|\#|m|t/g;
  let external;

  external = href.charAt(0).match(internalPattern)
    ? false
    : new URL(href).origin !== ORIGIN
      ? true
      : false;

  return `<a
    href="${href}"
    ${title ? 'title="' + title + '"' : undefined}
    rel="${external ? 'nofollow noopener noreferrer' : undefined}"
  >
    ${text}
  </a>`;
};
