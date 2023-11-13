import {
  PUBLIC_API_PATH_POSITIONS as POS,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import { posAPI } from '@api';
import { error } from '@sveltejs/kit';

export async function load({ params: { pathname, slug } }) {
  const endpoint = `${URL + POS}&filters[slug][$eq]=${slug}`;
  let data,
    position,
    seo,
    title,
    startDate,
    endDate,
    positionSlug,
    summary,
    body,
    hero,
    skills,
    organizations,
    projects,
    industries,
    awards;

  try {
    data = await posAPI(endpoint);
  } catch (error) {
    console.warn('Position page API error.');
    console.error(error);
  }

  if (!data) {
    throw error(500, 'Position Page Error');
  }

  position = {
    seo,
    title,
    startDate,
    endDate,
    slug: positionSlug,
    summary,
    body,
    hero,
    skills,
    organizations,
    projects,
    industries,
    awards,
  } = data[0].attributes;

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
    pathname,
    position: {
      ...position,
      hero: hero?.data?.attributes || false,
    },
    pageMeta,
  };
}
