import {
  PUBLIC_API_PATH_CV_PAGE as CV,
  PUBLIC_API_CV_PATH_LANDING_EXPERIENCE_LISTING as EX,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

const endpoint = URL + CV;
const experiencesEndpoint = URL + EX;

function structureExperiences(data) {
  var reducedExperiences = [];
  data.map((experience) => {
    let pos = {
      ...experience.attributes,
      skills: experience.attributes.skills.data,
      organizations: experience.attributes.organizations.data,
      projects: experience.attributes.projects.data,
      industries: experience.attributes.industries.data,
      awards: experience.attributes.awards.data,
    };
    reducedExperiences.push(pos);
  });
  return reducedExperiences;
}

export async function load() {
  var cv, experiencesData;
  let seo, hero, title, intro;

  try {
    cv = await api(endpoint);
    experiencesData = await api(experiencesEndpoint);
  } catch (error) {
    console.warn('CV page API error.');
    console.error(error);
  }

  if (!cv) {
    throw error(500, 'CV Page Error');
  }

  if (!experiencesData) {
    throw error(500, 'Experiences error on CV Page');
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

  const experiences = structureExperiences(experiencesData);

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
    experiences,
    pageMeta,
  };
}
