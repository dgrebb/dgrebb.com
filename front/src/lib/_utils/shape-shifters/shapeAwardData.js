export async function shapeAwardData(data) {
  let name, slug, URL, date, summary, body, seo, positions, projects;

  let award = ({
    name,
    slug,
    URL,
    date,
    summary,
    body,
    seo,
    positions,
    projects,
  } = data[0].attributes);

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
  };

  /**
   * Isolates the `metaImage` object properties we care about
   */
  pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || false;

  return {
    award,
    pageMeta,
  };
}
