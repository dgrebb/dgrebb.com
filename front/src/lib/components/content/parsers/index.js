import { marked } from 'marked';
import slugger from 'slugger';

/**
 * Parses the table of contents from markdown content.
 *
 * @param {string} contents - The markdown content.
 * @returns {Array} - Array of objects representing headings.
 */
export const parseTOC = function (contents) {
  const tokens = marked.lexer(contents);
  const headings = [];

  tokens.forEach((t) => {
    if (t.type === 'heading' && t.depth <= 2) {
      headings.push({
        text: marked.parseInline(t.text),
        link: `#${slugger(t.text)}`,
      });
    }
  });

  return headings;
};
