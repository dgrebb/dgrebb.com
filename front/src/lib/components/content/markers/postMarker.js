import { Marked, Renderer } from 'marked';
import markedAlert from 'marked-alert';
import { link, anchorHeading, image } from '../renderers/index.js';

const postRenderer = new Renderer();
postRenderer.link = link;
postRenderer.heading = anchorHeading;
postRenderer.image = image;

const postMarker = new Marked();
postMarker.use(markedAlert(), { renderer: postRenderer, gfm: true });

// Post markdown rendering/parsing function
/**
 * Render markdown text using the marked library.
 *
 * @param {string} text - The markdown text to render.
 * @returns {string} - Rendered HTML content.
 */
export default async function postMarked(text) {
  const content = postMarker.parse(text);
  return content;
}
