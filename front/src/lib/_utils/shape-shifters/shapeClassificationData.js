export async function shapeClassificationData(data) {
  let classification,
    { updatedAt, publishedAt, name, introduction, seo } = (classification =
      data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Classifications « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Classifications « CV « Dan Grebb`,
    titleTemplate: '%s « Classifications « CV « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      introduction ||
      'Dan did something. Once or twice. Check it out!',
  };

  return {
    classification,
    pageMeta,
  };
}
