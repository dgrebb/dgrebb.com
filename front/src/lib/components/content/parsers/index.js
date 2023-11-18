import { marked } from 'marked';
import slugger from 'slugger';

export const parseTOC = function (contents) {
  const tokens = marked.lexer(contents);
  const headings = tokens.filter((t) => t.type === 'heading' && t.depth <= 2);
  return [
    ...headings.map((h) => ({
      text: h.text,
      link: `#${slugger(h.text)}`,
    })),
  ];
};
