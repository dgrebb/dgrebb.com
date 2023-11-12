import {
  PUBLIC_API_PATH_CV_PAGE as CV,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import { cvAPI, posAPI } from '@api';
import { error } from '@sveltejs/kit';

const endpoint = URL + CV;
const positionsEndpoint =
  URL +
  '/positions?populate[hero]=*&populate[seo]=*&sort[0]=end:desc&sort[1]=start:desc&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*';

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
  let seo, hero, title, intro;

  try {
    cv = await cvAPI(endpoint);
    positionsData = await posAPI(positionsEndpoint);
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
    content: { hero, title, introduction: intro },
  } = cv);

  const page = {
    title,
    intro,
    hero: hero?.data?.attributes || false,
  };

  const positions = structurePositions(positionsData);

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
    positions,
    pageMeta,
  };
}
