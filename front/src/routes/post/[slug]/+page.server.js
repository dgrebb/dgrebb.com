import { error } from '@sveltejs/kit';
import api from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POST as POST,
  PUBLIC_POST_PARAMS as PARAMS,
} from '$env/static/public';
import { marked } from 'marked';

const renderer = {
  heading(text, level) {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    let depth = level + 1;

    return `<h${depth} id="${id}" class="post-heading">
      <a
        href="#${id}"
        class="heading-anchor-link"
        aria-label="Copy link to the &ldquo;${text}&rdquo; section">#</a
      >
      ${text}
    </h${depth}>`;
  },
};

marked.use({ renderer });

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

  let toc;
  $: toc = [];
  function filterTokens(event) {
    const tokens = event.detail.tokens;
    const headings = tokens.filter((t) => t.type === 'heading' && t.depth <= 2);
    toc = [
      ...toc,
      ...headings.map((h) => ({
        text: h.text,
        link: `#${slugger(h.text)}`,
      })),
    ];
  }

  function handleParsed(event) {
    filterTokens(event);
  }

  const markedContent = content.map((c) => {
    return c.__component === 'posts.text'
      ? { ...c, text: markItUp(c.text) }
      : c;
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
    summary: markItUp(summary),
    content: markedContent,
    pageMeta,
  };
}
