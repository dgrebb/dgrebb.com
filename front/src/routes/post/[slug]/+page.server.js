import { error } from '@sveltejs/kit';
import api from '@api';
import {
  API_URL as API,
  API_PATH_POST as POST,
  POST_PARAMS as PARAMS,
} from '$env/static/private';
import { parseTOC, parseHighlightedLines } from '@components/content/parsers';
import postMarked from '@components/content/markers/postMarker';

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
    const parsedContent = await Promise.all(
      content.map(async (c) => {
        switch (c.__component) {
          case 'posts.text':
            // Generate Table of Contents
            parsedTOC = parseTOC(c.text);
            toc.push(...parsedTOC);
            // Render markdown text
            return { ...c, text: await postMarked(c.text) };
          case 'posts.code':
            return {
              ...c,
              highlightedLines: await parseHighlightedLines(c.highlightedLines),
              startingLineNumber: c.startingLineNumber ?? 1,
            };
          case 'posts.animated-image': {
            const {
              animation: {
                data: {
                  attributes: {
                    url: animation,
                    width,
                    height,
                    alternativeText: aAlt,
                  },
                },
              },
              still: {
                data: {
                  attributes: { url: still, alternativeText: sAlt },
                },
              },
              figcaption,
              ...rest
            } = c;

            const enhancedFigcaption = figcaption
              ? await postMarked(figcaption)
              : null;

            return {
              ...rest,
              animation,
              width,
              height,
              aAlt,
              still,
              sAlt,
              slug,
              figcaption: enhancedFigcaption,
            };
          }
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
      summary: summary ? await postMarked(summary) : false,
      content: parsedContent,
      pageMeta,
    };
  } catch (error) {
    console.error('Error loading post:', error);
    error(404, {
      message: 'Not found',
    });
  }
}
