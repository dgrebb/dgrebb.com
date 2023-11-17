import {
  PUBLIC_API_PATH_CV_PAGE as CV,
  PUBLIC_API_CV_PATH_LANDING_POSITION_LISTING as POSITIONS,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

const endpoint = URL + CV;
const positionsEndpoint = URL + POSITIONS;

function structurePositions(data) {
  var reducedPositions = [];
  data.map((position) => {
    let pos = {
      ...position.attributes,
      skills: position.attributes.skills.data,
      organizations: position.attributes.organizations.data,
      projects: position.attributes.projects.data,
      industries: position.attributes.industries.data,
      awards: position.attributes.awards.data,
    };
    reducedPositions.push(pos);
  });
  return reducedPositions;
}

export async function load({ params: { pathname } }) {
  var cv, positionsData;
  let seo, hero, name, intro;

  try {
    cv = await api(endpoint);
    positionsData = await api(positionsEndpoint);
  } catch (error) {
    console.warn('CV page API error.');
    console.error(error);
  }

  if (!cv) {
    throw error(500, 'CV Page Error');
  }

  if (!positionsData) {
    throw error(500, 'Positions error on CV Page');
  }

  ({
    seo,
    content: { hero, name, introduction: intro },
  } = cv);

  const page = {
    name,
    intro,
    hero: hero?.data?.attributes || false,
  };

  const positions = structurePositions(positionsData);

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage =
    pageMeta?.metaImage?.data?.attributes || hero?.data?.attributes || false;

  return {
    page,
    positions,
    pageMeta,
  };
}
