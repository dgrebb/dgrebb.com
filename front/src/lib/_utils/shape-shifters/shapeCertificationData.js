export async function shapeCertificationData(data) {
  let certification,
    { updatedAt, publishedAt, name, introduction, hero, seo } = (certification =
      data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Certifications « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Certifications « CV « Dan Grebb`,
    titleTemplate: '%s « Certifications « CV « Dan Grebb',
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
    certification,
    pageMeta,
  };
}
