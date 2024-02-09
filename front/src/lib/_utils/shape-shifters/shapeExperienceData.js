// import { Marked, Renderer } from 'marked';
import marked from '@components/content/markers/marker';

/**
 * Shapes and prepares experience data for rendering.
 *
 * @param {Object[]} data - Array containing experience data.
 * @returns {Object} An object containing shaped experience data and page meta information.
 */
export async function shapeExperienceData(data) {
  const experience = data[0].attributes;
  const {
    updatedAt,
    publishedAt,
    introduction,
    body,
    skillBreakdown,
    name,
    hero,
    seo,
  } = experience;

  // Construct page meta information
  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Experiences « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Experiences « CV « Dan Grebb`,
    titleTemplate: '%s « Experiences « CV « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      introduction ||
      'Dan did something. Once or twice. Check it out!',
    metaImage:
      seo?.metaImage?.data?.attributes || hero?.data?.attributes || false,
  };

  // Process and highlight skills
  const highlightedSkills = skillBreakdown.map(
    ({ skill, percentage, summary }) => {
      const { name, slug, graphColor, iconColor } = skill.data.attributes;
      return {
        name,
        slug,
        percentage,
        graphColor:
          graphColor || Math.floor(Math.random() * 16777215).toString(16),
        iconColor,
        summary,
      };
    }
  );

  // Process markdown
  const markedBody = body ? marked(body) : false;

  return {
    experience: {
      ...experience,
      highlightedSkills,
      body: markedBody,
      hero: hero?.data?.attributes || false,
    },
    pageMeta,
  };
}
