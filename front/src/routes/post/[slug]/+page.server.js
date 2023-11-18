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

export async function load({ params: { slug }, route }) {
  const endpoint = API + POST + slug + PARAMS;
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

  function markItUp(text) {
    const content = marked.parse(text);
    return content;
  }

  let toc = [];

  const markedContent = content.map((c) => {
    switch (c.__component) {
      case 'posts.text':
        toc.push(...parseTOC(c.text));
        return { ...c, text: markItUp(c.text) };
        break;
      case 'posts.animated-image':
        return {
          ...c,
          figcaption: c.figcaption ? markItUp(c.figcaption) : null,
        };
        break;
      default:
        return c;
    }
  });

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
    toc,
    summary: summary ? markItUp(summary) : false,
    content: markedContent,
    pageMeta,
  };
}
