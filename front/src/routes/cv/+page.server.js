import {
  PUBLIC_API_PATH_CV_PAGE as CV,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import { cvAPI } from '@api';
import { error } from '@sveltejs/kit';

const endpoint = URL + CV;

export async function load({ params: { pathname } }) {
  var cv;
  let seo, hero, title, intro;

  try {
    cv = await cvAPI(endpoint);
  } catch (error) {
    console.warn('CV page API error.');
    console.error(error);
  }

  if (!cv) {
    throw error(500, 'CV Page Error');
  }

  ({
    seo,
    content: { hero, title, introduction: intro },
  } = cv);

  const page = {
    title,
    intro,
    hero: hero?.data?.attributes || false,
  };

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || title,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage =
    pageMeta?.metaImage?.data?.attributes || hero?.data?.attributes || false;

  return {
    page,
    pageMeta,
  };
}
