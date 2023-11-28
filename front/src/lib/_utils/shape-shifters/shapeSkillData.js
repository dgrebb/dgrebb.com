export async function shapeSkillData(data) {
  let skill,
    { name, hero, summary, updatedAt, publishedAt, seo } = (skill =
      data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: seo?.metaTitle || name,
    socialTitle: `${seo?.metaTitle || name} « Skills « Dan Grebb`,
    titleTemplate: '%s « Skills « Dan Grebb',
    metaDescription:
      seo?.metaDescription ||
      summary ||
      'Dan did something. Once or twice. Check it out!',
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage =
    pageMeta?.metaImage?.data?.attributes || hero?.data?.attributes || false;

  return {
    skill: {
      ...skill,
      hero: hero?.data?.attributes || false,
    },
    pageMeta,
  };
}
