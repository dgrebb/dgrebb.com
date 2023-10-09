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
    socialTitle: `${seo?.metaTitle || title} « Writing « Dan Grebb`,
    titleTemplate: '%s « Writing « Dan Grebb',
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
      url: 'https://s.dgrebb.com/img/default_posts_0d52ddf1f2.webp',
      alternativeText:
        'A desk with various electronics, music instruments, audio equipment, and books laid out in an organized fashion.',
    };

  return {
    post: post || {},
    pageMeta,
  };
}
