export async function shapeAwardData(data) {
  let award,
    { updatedAt, publishedAt, name, introduction, hero, seo } = (award =
      data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Awards « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Awards « CV « Dan Grebb`,
    titleTemplate: '%s « Awards « CV « Dan Grebb',
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
    award,
    pageMeta,
  };
}
