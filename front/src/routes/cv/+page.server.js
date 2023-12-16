import { marked } from 'marked';
import { link, heading } from '@components/content/renderers';
import {
  PUBLIC_API_PATH_CV_PAGE as CV,
  PUBLIC_API_CV_PATH_LANDING_EXPERIENCE_LISTING as EX,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import { error } from '@sveltejs/kit';

const renderer = new marked.Renderer();
renderer.link = link;
renderer.heading = heading;
marked.use({ renderer });

/**
 * Defines the URL endpoints for fetching CV and experiences data.
 */
const endpoint = URL + CV;
const experiencesEndpoint = URL + EX;

/**
 * Takes raw experiences data, sorts it based on start date, and maps it to
 * a more structured format.
 *
 * @param {Array} data - Raw experiences data.
 * @returns {Array} - Structured experiences data.
 */
function structureExperiences(data) {
  const sortedData = data.slice().sort((a, b) => {
    const startDateA = new Date(a.attributes.startDate).getTime();
    const startDateB = new Date(b.attributes.startDate).getTime();

    if (a.attributes.endDate === null && b.attributes.endDate !== null) {
      return -1; // Move item with null endDate to the front
    } else if (a.attributes.endDate !== null && b.attributes.endDate === null) {
      return 1; // Move item with null endDate to the front
    }

    // Sort by startDate for other cases (descending order)
    return startDateB - startDateA || 0;
  });

  // TODO: remove short-circuit from story field
  return sortedData.map((experience) => ({
    ...experience.attributes,
    story: experience?.attributes?.story
      ? marked(experience.attributes.story)
      : false,
    summary: marked(experience.attributes.summary),
    skills: experience.attributes.skills.data,
    organizations: experience.attributes.organizations.data,
    projects: experience.attributes.projects.data,
    industries: experience.attributes.industries.data,
    awards: experience.attributes.awards.data,
  }));
}

/**
 * SvelteKit load function for fetching and processing data for the CV page.
 *
 * @returns {Promise} - Resolves to an object containing page, experiences,
 * and pageMeta data.
 */
export async function load() {
  try {
    const [cv, experiencesData] = await Promise.all([
      api(endpoint),
      api(experiencesEndpoint),
    ]);

    if (!cv) {
      error(500, 'CV Page Error');
    }

    if (!experiencesData) {
      error(500, 'Experiences error on CV Page');
    }

    const {
      seo,
      content: {
        updatedAt,
        publishedAt,
        hero,
        summary,
        title,
        introduction: intro,
      },
    } = cv;

    const page = {
      title,
      intro: marked.parse(intro),
      hero: hero?.data?.attributes || false,
    };

    const experiences = structureExperiences(experiencesData);

    const pageMeta = {
      ...seo,
      updatedAt,
      publishedAt,
      type: 'article',
      metaTitle: 'Résumé',
      socialTitle:
        seo?.metaSocial?.find((obj) => obj.socialNetwork === 'Twitter')
          ?.title || `Résumé « Dan Grebb`,
      titleTemplate: '%s « Dan Grebb',
      metaDescription:
        seo?.metaDescription ||
        summary ||
        "Dan Grebb's Résumé. A collection of professional experiences, awards, projects, and skills collected since 1999.",
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
  } catch (error) {
    console.warn('CV page API error.');
    console.error(error);
    throw error(500, 'CV Page Error');
  }
}
