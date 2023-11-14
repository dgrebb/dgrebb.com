import {
  PUBLIC_API_LANDING_PAGE_PARTIAL as PAGE,
  PUBLIC_API_CV_COLLECTION_PARAMS as ITEMS,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

export async function load({ params: { pathname, collection } }) {
  const pageEndpoint = `${URL}/${collection + PAGE}`;
  const collectionEndpoint = `${URL}/${collection + ITEMS}`;
  let pageData, collectionData;

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
    throw error(500, `${collection} Collection Page Error`);
  }

  return {
    collection,
    pageData,
    collectionData,
  };
}
