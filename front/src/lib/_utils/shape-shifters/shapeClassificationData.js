export async function shapeClassificationData(data) {
  let seo,
    name,
    hero,
    start,
    end,
    classificationSlug,
    summary,
    body,
    artifacts,
    skills,
    organizations,
    industries,
    awards;

  let classification = ({
    seo,
    name,
    hero,
    start,
    end,
    slug: classificationSlug,
    summary,
    body,
    artifacts,
    skills,
    organizations,
    industries,
    awards,
  } = data[0].attributes);

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
    classification,
    pageMeta,
  };
}
