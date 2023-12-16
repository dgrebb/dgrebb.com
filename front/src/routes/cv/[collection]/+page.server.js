import {
  PUBLIC_API_LANDING_PAGE_PARTIAL as PAGE,
  PUBLIC_API_CV_COLLECTION_PARAMS as ITEMS,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

export async function load({ params: { collection } }) {
  const pageEndpoint = `${URL}/${collection + PAGE}`;
  const collectionEndpoint = `${URL}/${collection + ITEMS}`;
  let pageData,
    collectionData,
    hero,
    title,
    introduction,
    seo,
    updatedAt,
    publishedAt;

  try {
    [pageData, collectionData] = await Promise.all([
      api(pageEndpoint),
      api(collectionEndpoint),
    ]);
  } catch (error) {
    console.warn(`${collection} Collection API Error`);
    console.error(error);
  }

  if (!collectionData) {
    error(500, `${collection} Collection Page Error`);
  }

  ({
    seo,
    content: { updatedAt, publishedAt, hero, introduction, title },
  } = pageData);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: title || seo?.metaTitle || '',
    socialTitle: `${seo?.metaTitle || title} « CV « Dan Grebb`,
    titleTemplate: '%s « CV « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      introduction ||
      'Dan did something. Once or twice. Check it out!',
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage =
    pageMeta?.metaImage?.data?.attributes || hero?.data?.attributes || false;

  return {
    collection: collection || null,
    pageData: pageData || {},
    pageMeta: pageMeta || {},
    collectionData: collectionData || {},
  };
}
