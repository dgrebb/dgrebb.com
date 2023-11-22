export async function shapeIndustryData(data) {
  let industry,
    { seo } = (industry = data[0].attributes);

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || industry,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || false;

  return {
    industry,
    pageMeta,
  };
}
