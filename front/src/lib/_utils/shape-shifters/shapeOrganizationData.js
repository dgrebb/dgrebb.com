export async function shapeOrganizationData(data) {
  let organization,
    { name, images, seo } = (organization = data[0].attributes);

  var pageMeta = {
    ...seo,
    type: 'website',
    metaTitle: seo?.metaTitle || name,
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
