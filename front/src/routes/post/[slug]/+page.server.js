import { error } from '@sveltejs/kit';
import api from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POST as POST,
  PUBLIC_POST_PARAMS as PARAMS,
} from '$env/static/public';

export async function load({ params: { slug }, route }) {
  const endpoint = URL + POST + slug + PARAMS;
  const post = await api(endpoint);

  if (!post || post.error) {
    console.warn({
      route,
      slug,
      endpoint: endpoint,
      error: post?.error,
    });

    throw error(404, {
      message: `Page not found!`,
    });
  }

  const { title, hero, summary, createdAt, updatedAt, publishedAt, seo } = post;

  const pageMeta = {
    ...seo,
    createdAt,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: seo?.metaTitle || title,
    titleTemplate: '%s | Writing | Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      summary ||
      'Dan wrote a lovely story for you. Check it out!',
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes ||
    hero?.data?.attributes || {
      url: 'https://s.dgrebb.com/img/default_banner_2a50e43220.png',
      alternativeText: 'The Circuit of Life',
    };

  return {
    post: post || {},
    pageMeta,
  };
}
