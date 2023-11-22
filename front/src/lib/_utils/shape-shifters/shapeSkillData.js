export async function shapeSkillData(data) {
  let skill,
    { hero, seo } = (skill = data[0].attributes);

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || skill,
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
