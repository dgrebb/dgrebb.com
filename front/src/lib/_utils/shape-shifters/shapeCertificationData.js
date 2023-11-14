export async function shapeCertificationData(data) {
  let certification,
    seo,
    name,
    hero,
    start,
    end,
    certificationSlug,
    summary,
    body,
    artifacts,
    skills,
    organizations,
    industries,
    awards = false;

  certification = {
    seo,
    name,
    hero,
    start,
    end,
    slug: certificationSlug,
    summary,
    body,
    artifacts,
    skills,
    organizations,
    industries,
    awards,
  } = data[0].attributes;

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
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
