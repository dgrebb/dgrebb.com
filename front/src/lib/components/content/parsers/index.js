import { marked } from 'marked';
import slugger from 'slugger';

/**
 * @function
 * @name parseTOC
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

/**
 * @function
 * @name parseHighlightedLines
 * Parses the highlighted lines string into an array of line numbers.
 * Adjusts line numbers for zero-based indexing and sorts them in ascending order.
 *
 * @param {string|false} lines - The string of highlighted lines or false.
 * @returns {Array<number>|false} An array of adjusted line numbers, or false if input is falsy.
 */
export const parseHighlightedLines = async function parseHighlightedLines(
  lines
) {
  if (!lines) {
    return false;
  }

  return lines
    .split(',')
    .reduce((acc, part) => {
      const range = part
        .trim()
        .split('-')
        .map((num) => parseInt(num, 10) - 1);

      if (range.length === 2) {
        for (let i = range[0]; i <= range[1]; i++) {
          acc.push(i);
        }
      } else {
        acc.push(range[0]);
      }

      return acc;
    }, [])
    .sort((a, b) => a - b);
};
