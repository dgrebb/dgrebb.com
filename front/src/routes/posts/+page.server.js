import { error } from '@sveltejs/kit';
import api from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS_PAGE as PAGE,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_POSTS_PREVIEW_PARAMS as PARAMS,
} from '$env/static/public';

const pageEndpoint = URL + PAGE;
const postsEndpoint = URL + POSTS + PARAMS;

export async function load({ route }) {
  var page, posts;

  try {
    [page, posts] = await Promise.all([api(pageEndpoint), api(postsEndpoint)]);
  } catch (error) {
    console.warn('Error fetching posts grid data.');
    console.error(error);
  }

  if (!page) {
    console.error({
      route: route.id,
      endpoint: pageEndpoint,
      error: page.error,
    });
  }

  if (!posts.length) {
    console.error({
      route,
      endpoint: postsEndpoint,
      error: posts.error,
    });
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

  return {
    page: page || {},
    posts: posts || [],
    pageMeta,
  };
}
