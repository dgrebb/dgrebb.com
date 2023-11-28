export async function shapeIndustryData(data) {
  let industry,
    { updatedAt, publishedAt, name, introduction, hero, seo } = (industry =
      data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Industries « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Industries « CV « Dan Grebb`,
    titleTemplate: '%s « Industries « CV « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      introduction ||
      'Dan did something. Once or twice. Check it out!',
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage =
    hero?.data?.attributes?.hero ||
    pageMeta?.metaImage?.data?.attributes ||
    false;

  return {
    industry,
    pageMeta,
  };
}
