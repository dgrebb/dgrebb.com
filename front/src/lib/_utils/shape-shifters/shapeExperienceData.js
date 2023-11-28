export async function shapeExperienceData(data) {
  let experience,
    { name, hero, seo } = (experience = data[0].attributes);

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
    experience: {
      ...experience,
      hero: hero?.data?.attributes || false,
    },
    pageMeta,
  };
}
