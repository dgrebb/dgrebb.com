import { marked } from 'marked';
import { link, heading } from '@components/content/renderers';

/**
 * Shapes artifact data by categorizing websites and videos.
 *
 * @param {Array} data - Array of artifacts.
 * @returns {Object} - Shaped artifact data with websites and videos.
 */
async function shapeArtifactData(data) {
  const shapenedArtifactData = {
    websites: [],
    videos: [],
  };

  const caseHandlers = {
    'artifacts.websites': (artifact) => {
      shapenedArtifactData.websites.push(...artifact.details);
    },
    'artifacts.videos': (artifact) => {
      shapenedArtifactData.videos.push({
        videoFile: artifact.videoFile?.data?.attributes?.url,
        videoCaptions: artifact.videoCaptions?.data?.attributes?.url || null,
        details: artifact.details,
      });
    },
    // Add more case handlers if needed
  };

  data.forEach((artifact) => {
    const caseHandler = caseHandlers[artifact.__component];
    if (caseHandler) {
      caseHandler(artifact);
    }
  });

  return shapenedArtifactData;
}

/**
 * Shapes project data, optimizing artifact data shaping and Markdown parsing.
 * @async
 * @param {Array} data - An array containing project data.
 * @returns {Object} - Shaped project data with optimized artifacts and parsed body.
 */
export async function shapeProjectData(data) {
  /**
   * Custom renderer for marked library.
   * @type {marked.Renderer}
   */
  const renderer = new marked.Renderer();
  renderer.link = link;
  renderer.heading = heading;

  marked.use({ renderer, gfm: true });

  /**
   * Destructuring relevant attributes from the first element of the data array.
   * @type {Object}
   */
  let project,
    { updatedAt, publishedAt, introduction, name, hero, body, seo } = (project =
      data[0].attributes);

  /**
   * Metadata for the project.
   * @type {Object}
   */
  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Projects « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Projects « CV « Dan Grebb`,
    titleTemplate: '%s « Projects « CV « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      introduction ||
      'Dan did something. Once or twice. Check it out!',
  };

  /**
   * Isolates the `metaImage` object properties we care about.
   * @type {Object|boolean}
   */
  pageMeta.metaImage =
    pageMeta?.metaImage?.data?.attributes || hero?.data?.attributes || false;

  // Optimize the shaping of artifact data
  /**
   * Shaped artifact data.
   * @type {Object}
   */
  const artifacts = await shapeArtifactData(project.artifacts);

  // Optimize Markdown parsing
  /**
   * Parsed body content.
   * @type {string|boolean}
   */
  const parsedBody = body ? marked.parse(body) : false;

  /**
   * Final shaped project data.
   * @type {Object}
   */
  return {
    project: {
      ...project,
      hero: hero?.data?.attributes || false,
      body: parsedBody,
      artifacts,
    },
    pageMeta,
  };
}
