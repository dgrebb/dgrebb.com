import api from '@api';
import {
  API_URL as URL,
  API_PATH_POSTS_PAGE as PAGE,
  API_PATH_POSTS as POSTS,
  POSTS_PREVIEW_PARAMS as PARAMS,
} from '$env/static/private';
import { marked } from 'marked';
import { link } from '@components/content/renderers';

const renderer = new marked.Renderer();
renderer.link = link;

const pageEndpoint = URL + PAGE;
const postsEndpoint = URL + POSTS + PARAMS;

export async function load({ route }) {
  var page, posts;

  try {
    [page, posts] = await Promise.all([api(pageEndpoint), api(postsEndpoint)]);
  } catch (error) {
    if (!page) {
      console.error({
        route: route.id,
        endpoint: pageEndpoint,
        error: page.error,
      });
      console.warn('Error fetching posts page data.');
    }

    if (!posts.length) {
      console.error({
        route,
        endpoint: postsEndpoint,
        error: posts.error,
      });
      console.warn('Error fetching posts grid data.');
    }
  }

  var pageMeta = {
    ...page.seo,
    type: 'website',
    metaTitle: 'Writing « Dan Grebb',
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || {
    url: 'https://s.dgrebb.com/img/default_posts_0d52ddf1f2.webp',
    alternativeText:
      'A desk with various electronics, music instruments, audio equipment, and books laid out in an organized fashion.',
  };

  const markedPage = {
    ...page,
    description: marked.parse(page.description),
  };

  return {
    page: markedPage || {},
    posts: posts || [],
    pageMeta,
  };
}
