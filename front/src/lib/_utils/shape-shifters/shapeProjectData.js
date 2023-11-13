async function shapeArtifactData(data) {
  let shapenedArtifactData = {};
  data.forEach((artifact) => {
    switch (artifact.__component) {
      case 'artifacts.websites':
        shapenedArtifactData.websites = [...artifact.details];
        break;

      default:
        break;
    }
  });

  return shapenedArtifactData;
}

export async function shapeProjectData(data) {
  let project,
    seo,
    name,
    hero,
    start,
    end,
    projectSlug,
    summary,
    body,
    artifacts,
    skills,
    organizations,
    industries,
    awards = false;

  project = {
    seo,
    name,
    hero,
    start,
    end,
    slug: projectSlug,
    summary,
    body,
    artifacts,
    skills,
    organizations,
    industries,
    awards,
  } = data[0].attributes;

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
      artifacts: await shapeArtifactData(project.artifacts),
    },
    pageMeta,
  };
}
