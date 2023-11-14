export async function shapeAwardData(data) {
  let award,
    slug,
    URL,
    date,
    summary,
    body,
    seo,
    positions,
    projects = false;

  award = { slug, URL, date, summary, body, seo, positions, projects } =
    data[0].attributes;

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || award,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || false;

  return {
    award: {
      ...award,
    },
    pageMeta,
  };
}
