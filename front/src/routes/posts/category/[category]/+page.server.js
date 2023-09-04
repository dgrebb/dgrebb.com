import { error } from '@sveltejs/kit';
import api, { categoryAPI } from '@api';
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_API_PATH_CATEGORY as CAT,
  PUBLIC_CATEGORY_PAGE_PARAMS as PARAMS,
} from '$env/static/public';

export async function load({ params }) {
  const { category } = params;
  const categoriesSingletonEndpoint =
    URL + '/categories-page?populate[0]=seo.metaImage';
  const categoryCollectionEndpoint = URL + '/categories';
  const categoryEndpoint = URL + CAT + category + '?populate[0]=seo.metaImage';
  const postsEndpoint = URL + POSTS + PARAMS + category;
  const [
    categoriesSingletonContent,
    categoryCollectionContent,
    categoryContent,
    posts,
  ] = await Promise.all([
    api(categoriesSingletonEndpoint),
    api(categoryCollectionEndpoint),
    categoryAPI(categoryEndpoint),
    api(postsEndpoint),
  ]);

  if (!categoryContent) {
    console.info({
      params,
      postsEndpoint,
      categoryEndpoint,
    });
    throw error(404, {
      message: 'Category not found!',
    });
  }

  const { name, seo } = categoryContent;

  const pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
    titleTemplate: '%s | Categories | Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      categoryContent?.description ||
      `Here's a collection of posts about ${name}`,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = {
    url:
      pageMeta?.metaImage?.formats?.large?.url ||
      categoriesSingletonContent?.seo?.metaImage?.formats?.large?.url ||
      'https://s.dgrebb.com/img/default_categories_34209a13ff.png',
    alternativeText:
      pageMeta?.metaImage?.alternativeText ||
      categoriesSingletonContent?.seo?.metaImage?.alternativeText ||
      'A tree with various objects floating around it, signifying many different categories of information.',
  };

  return {
    categoriesSingletonContent,
    categoryCollectionContent,
    categoryContent,
    posts: posts || [],
    pageMeta,
  };
}
