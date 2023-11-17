export async function shapeIndustryData(data) {
  let seo,
    name,
    industrySlug,
    summary,
    skills,
    organizations,
    positions,
    projects,
    body;

  let industry = ({
    seo,
    name,
    slug: industrySlug,
    summary,
    skills,
    organizations,
    positions,
    projects,
    body,
  } = data[0].attributes);

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || industry,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || false;

  return {
    industry,
    pageMeta,
  };
}
