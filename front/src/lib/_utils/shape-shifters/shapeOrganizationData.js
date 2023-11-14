export async function shapeOrganizationData([data]) {
  let organization,
    name,
    images,
    URL,
    summary,
    projects,
    positions,
    skills,
    body,
    seo = false;

  organization = {
    name,
    images,
    URL,
    summary,
    projects,
    positions,
    skills,
    body,
  } = data.attributes;

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
  };

  pageMeta.metaImage =
    pageMeta?.metaImage?.data?.attributes || images?.data?.attributes || false;

  return {
    organization: {
      ...organization,
      images: images?.data?.attributes || false,
    },
    pageMeta,
  };
}
