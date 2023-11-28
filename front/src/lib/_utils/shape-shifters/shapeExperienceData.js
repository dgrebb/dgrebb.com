export async function shapeExperienceData(data) {
  let experience,
    { updatedAt, publishedAt, introduction, name, hero, seo } = (experience =
      data[0].attributes);

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
