export async function shapeOrganizationData(data) {
  let organization,
    { updatedAt, publishedAt, name, introduction, images, seo } =
      (organization = data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Organizations « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Organizations « CV « Dan Grebb`,
    titleTemplate: '%s « Organizations « CV « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      introduction ||
      'Dan did something. Once or twice. Check it out!',
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
