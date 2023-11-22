import { marked } from 'marked';
import { link, heading } from '@components/content/renderers';

async function shapeArtifactData(data) {
  let shapenedArtifactData = {
    websites: [],
    videos: [],
  };
  data.forEach((artifact) => {
    switch (artifact.__component) {
      case 'artifacts.websites':
        shapenedArtifactData.websites.push(...artifact.details);
        break;
      case 'artifacts.videos':
        shapenedArtifactData.videos.push({
          videoFile: artifact.videoFile.data.attributes.url,
          videoCaptions: artifact.videoCaptions?.data?.attributes?.url || null,
          details: artifact.details,
        });
        break;

      default:
        break;
    }
  });

  return shapenedArtifactData;
}

export async function shapeProjectData(data) {
  const renderer = new marked.Renderer();
  renderer.link = link;
  renderer.heading = heading;

  marked.use({ renderer });

  let project,
    { name, hero, body, seo } = (project = data[0].attributes);

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
    project: {
      ...project,
      hero: hero?.data?.attributes || false,
      body: body ? marked.parse(body) : false,
      artifacts: await shapeArtifactData(project.artifacts),
    },
    pageMeta,
  };
}
