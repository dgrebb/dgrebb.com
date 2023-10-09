<script>
  import { PUBLIC_ENV as env } from '$env/static/public';
  import { MetaTags } from 'svelte-meta-tags';

  export let pageMeta;

  const {
    metaTitle,
    socialTitle,
    metaImage,
    metaDescription,
    metaRobots,
    canonicalURL,
    metaViewport,
    metaKeywords,
    metaSocial,
    updatedAt,
    publishedAt,
    type,
    titleTemplate,
  } = pageMeta;

  const OGImages = [
    {
      url: metaImage?.url,
      width: metaImage?.width || 1600,
      height: metaImage?.height || 900,
      alt: metaImage?.alternativeText,
    },
  ];

  const twitter =
    metaSocial?.find((obj) => obj.socialNetwork === 'Twitter') || false;

  const facebook =
    metaSocial?.find((obj) => obj.socialNetwork === 'Facebook') || false;
</script>

<MetaTags
  title={metaTitle || 'Dan Grebb'}
  {titleTemplate}
  description={metaDescription ||
    'Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania.'}
  robots={env === 'production' || env === 'development'
    ? metaRobots || 'index, follow'
    : 'noindex, nofollow'}
  canonical={canonicalURL || false}
  additionalMetaTags={[
    {
      name: 'viewport',
      content: metaViewport || 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content:
        metaKeywords ||
        'Dan Grebb, dgrebb, software, engineer, volunteer, craft, developer, web, Philadelphia, Pennsylvania',
    },
    {
      name: 'publisher',
      content: 'Dan Grebb (www.dgrebb.com)',
    },
    {
      name: 'author',
      content: 'Dan Grebb (www.dgrebb.com)',
    },
  ]}
  openGraph={{
    title: socialTitle || metaTitle,
    description: metaDescription,
    url: canonicalURL || false,
    type: type,
    article: {
      author: 'Dan Grebb',
      publishedTime: publishedAt ? publishedAt : '0000-01-01T00:00:00.000Z',
      modifiedTime: updatedAt ? updatedAt : '0000-01-01T03:33:00.000Z',
    },
    images: OGImages,
  }}
  twitter={{
    site: '@dgrebb',
    creator: '@dgrebb',
    cardType: 'summary_large_image',
    title: twitter?.title || socialTitle || pageMeta.title,
    description: twitter?.description || pageMeta.metaDescription,
    image: twitter?.image?.data?.attributes?.url || metaImage.url,
    imageAlt:
      twitter?.image?.data?.attributes?.alternativeText || metaImage.alt,
  }}
/>
