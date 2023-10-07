import { error } from '@sveltejs/kit';
import api, { categoryAPI } from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_POSTS_PREVIEW_PARAMS as POSTS_PARAMS,
  PUBLIC_API_PATH_CATEGORY as CAT,
  PUBLIC_CATEGORY_PAGE_PARAMS as CAT_PARAMS,
} from '$env/static/public';

export async function load({ params }) {
  const { category } = params || 'all';
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

  const { name, seo } = individualCategoryContent;

  const pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
    titleTemplate: '%s | Categories | Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      individualCategoryContent?.description ||
      `Here's a collection of posts about ${name}`,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = {
    url:
      pageMeta?.metaImage?.formats?.large?.url ||
      categoryPageContent?.seo?.metaImage?.formats?.large?.url ||
      'https://s.dgrebb.com/img/default_categories_34209a13ff.png',
    alternativeText:
      pageMeta?.metaImage?.alternativeText ||
      categoryPageContent?.seo?.metaImage?.alternativeText ||
      'A tree with various objects floating around it, signifying many different categories of information.',
  };

  return {
    category,
    categoryPageContent,
    categoriesListContent,
    individualCategoryContent,
    posts: posts || [],
    pageMeta,
  };
}
