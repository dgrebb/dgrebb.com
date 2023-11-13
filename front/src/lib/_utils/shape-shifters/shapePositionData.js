export async function shapePositionData(data) {
  let position,
    seo,
    title,
    startDate,
    endDate,
    positionSlug,
    summary,
    body,
    hero,
    skills,
    organizations,
    projects,
    industries,
    awards = false;

  position = {
    seo,
    title,
    startDate,
    endDate,
    slug: positionSlug,
    summary,
    body,
    hero,
    skills,
    organizations,
    projects,
    industries,
    awards,
  } = data[0].attributes;

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
    position: {
      ...position,
      hero: hero?.data?.attributes || false,
    },
    pageMeta,
  };
}
