import { error } from '@sveltejs/kit';
import api from '@api';
import {
  PUBLIC_API_URL as API,
  PUBLIC_API_PATH_POST as POST,
  PUBLIC_POST_PARAMS as PARAMS,
} from '$env/static/public';
import { marked } from 'marked';
import { link, heading } from '@components/content/renderers';
import { parseTOC } from '@components/content/parsers';

const renderer = new marked.Renderer();
renderer.link = link;
renderer.heading = heading;

marked.use({ renderer });

// Markdown rendering function
/**
 * Render markdown text using the marked library.
 *
 * @param {string} text - The markdown text to render.
 * @returns {string} - Rendered HTML content.
 */
async function markItUp(text) {
  const content = marked.parse(text);
  return content;
}

/**
 * Load function to fetch and process a blog post.
 *
 * @param {Object} params - Parameters object containing the slug.
 * @param {string} params.slug - The slug of the blog post.
 * @param {Object} route - The route object.
 * @returns {Promise<Object>} - Promise resolving to an object containing post data.
 * @throws {Error} - Throws an error if the post is not found or an internal server error occurs.
 */
export async function load({ params: { slug }, route }) {
  try {
    // API request to fetch the blog post
    const endpoint = API + POST + slug + PARAMS;
    const post = await api(endpoint);

    // Handle errors gracefully
    if (!post || post.error) {
      console.warn({
        route,
        slug,
        endpoint: endpoint,
        error: post?.error,
      });

      error(404, {
        message: `Page not found!`,
      });
    }

    const {
      title,
      hero,
      summary,
      content,
      createdAt,
      updatedAt,
      publishedAt,
      seo,
    } = post;

    let toc = [];
    let parsedTOC;

    // Process each content component
    const markedContent = await Promise.all(
      content.map(async (c) => {
        switch (c.__component) {
          case 'posts.text':
            // Generate Table of Contents
            parsedTOC = parseTOC(c.text);
            toc.push(...parsedTOC);
            // Render markdown text
            return { ...c, text: await markItUp(c.text) };
          case 'posts.animated-image':
            // Render figcaption if present
            return {
              ...c,
              figcaption: c.figcaption ? await markItUp(c.figcaption) : null,
            };
          default:
            return c;
        }
      })
    );

    const pageMeta = {
      ...seo,
      createdAt,
      updatedAt,
      publishedAt,
      type: 'article',
      metaTitle: seo?.metaTitle || title,
      socialTitle: `${seo?.metaTitle || title} « Writing « Dan Grebb`,
      titleTemplate: '%s « Writing « Dan Grebb',
      metaDescription:
        seo?.metaDescription ||
        summary ||
        'Dan wrote a lovely story for you. Check it out!',
    };

    // Extract relevant properties for the metaImage
    pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes ||
      hero?.data?.attributes || {
        url: 'https://s.dgrebb.com/img/default_posts_0d52ddf1f2.webp',
        alternativeText:
          'A desk with various electronics, music instruments, audio equipment, and books laid out in an organized fashion.',
      };

    // Return processed post data
    return {
      post: post || {},
      toc,
      summary: summary ? await markItUp(summary) : false,
      content: markedContent,
      pageMeta,
    };
  } catch (error) {
    console.error('Error loading post:', error);
    throw error(500, {
      message: 'Internal Server Error',
    });
  }
}
