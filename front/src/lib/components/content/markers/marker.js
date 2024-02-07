import { Marked, Renderer } from 'marked';
import markedAlert from 'marked-alert';
import { heading, link } from '../renderers/index.js';

const renderer = new Renderer();
renderer.link = link;
renderer.heading = heading;

const marker = new Marked();
marker.use(markedAlert(), { renderer: renderer, gfm: true });

// General markdown rendering function
/**
 * Render markdown text using the marked library.
 *
 * @param {string} text - The markdown text to render.
 * @returns {string} - Rendered HTML content.
 */
export default async function marked(text) {
  const content = marker.parse(text);
  return content;
}
