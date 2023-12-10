import { error } from '@sveltejs/kit';
import api, { categoryAPI } from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_POSTS_PREVIEW_PARAMS as POSTS_PARAMS,
  PUBLIC_API_PATH_CATEGORY as CAT,
  PUBLIC_CATEGORY_PAGE_PARAMS as CAT_PARAMS,
} from '$env/static/public';
import { marked } from 'marked';
import { link } from '@components/content/renderers';

const renderer = new marked.Renderer();
renderer.link = link;

marked.use({ renderer });

export async function load({ params }) {
  const category = params.category.replace('/', '') || 'all';
  const categoryPageEndpoint =
    URL + '/categories-page?populate[0]=seo.metaImage';
  const categoriesListEndpoint =
    URL + '/categories?sort[0]=name&filters[slug][$not]=all';
  const individualCategoryEndpoint =
    URL + CAT + category + '?populate[0]=seo.metaImage';
  const postsEndpoint =
    URL + POSTS + (category !== 'all' ? CAT_PARAMS + category : POSTS_PARAMS);
  const [
    categoryPageContent,
    categoriesListContent,
    individualCategoryContent,
    posts,
  ] = await Promise.all([
    api(categoryPageEndpoint),
    api(categoriesListEndpoint),
    categoryAPI(individualCategoryEndpoint),
    api(postsEndpoint),
  ]);

  if (!individualCategoryContent) {
    console.info({
      params,
      postsEndpoint,
      individualCategoryEndpoint,
    });
    throw error(404, {
      message: 'Category not found!',
    });
  }

  const {
    name,
    seo,
    description: categoryDescription,
  } = individualCategoryContent;

  const pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
    socialTitle: `${seo?.metaTitle || name} « Writing by Category « Dan Grebb`,
    titleTemplate: `%s « Writing by Category « Dan Grebb`,
    metaDescription:
      categoryDescription !== null
        ? categoryDescription
        : `"Read what I have to say about ${name}"`,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = {
    url:
      pageMeta?.metaImage?.formats?.large?.url ||
      categoryPageContent?.seo?.metaImage?.formats?.large?.url ||
      'https://s.dgrebb.com/img/default_categories_ad8e01e054.webp',
    alternativeText:
      pageMeta?.metaImage?.alternativeText ||
      categoryPageContent?.seo?.metaImage?.alternativeText ||
      'A tree with various objects floating around it, signifying many different categories of information.',
  };

  var markedPosts = [];

  posts
    ? posts.map((post) => {
        return markedPosts.push({
          ...post,
          attributes: {
            ...post.attributes,
            summary: post.attributes.summary
              ? marked.parse(post.attributes.summary)
              : false,
          },
        });
      })
    : false;

  return {
    category,
    categoryPageContent,
    categoriesListContent,
    individualCategoryContent,
    posts: markedPosts || [],
    pageMeta,
  };
}
