export async function shapeSkillData(data) {
  let skill,
    hero,
    slug,
    summary,
    proficiency,
    icon,
    classification,
    projects,
    positions,
    organizations,
    seo = false;

  skill = {
    hero,
    slug,
    summary,
    proficiency,
    icon,
    classification,
    projects,
    positions,
    organizations,
    seo,
  } = data[0].attributes;

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
