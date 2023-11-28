export async function shapeSkillData(data) {
  let skill,
    { name, hero, introduction, updatedAt, publishedAt, seo } = (skill =
      data[0].attributes);

  const pageMeta = {
    ...seo,
    updatedAt,
    publishedAt,
    type: 'article',
    metaTitle: name || seo?.metaTitle || 'Skills « CV « Dan Grebb',
    socialTitle: `${seo?.metaTitle || name} « Skills « CV « Dan Grebb`,
    titleTemplate: '%s « Skills « CV « Dan Grebb',
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
    skill: {
      ...skill,
      hero: hero?.data?.attributes || false,
    },
    pageMeta,
  };
}
