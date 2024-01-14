<script>
  /**
   * Svelte component for generating meta tags based on the provided pageMeta.
   * @module MetaTagsComponent
   * @typedef {import('svelte-meta-tags/MetaTags.svelte').MetaTagsProps} MetaTagsProps
   * @typedef {Object} PageMeta
   * @property {string} metaTitle - The title for the meta tags.
   * @property {string} socialTitle - The social title for the meta tags.
   * @property {Object} metaImage - The meta image information.
   * @property {string} metaDescription - The meta description for the page.
   * @property {string} metaRobots - The meta robots tag.
   * @property {string} canonicalURL - The canonical URL for the page.
   * @property {string} metaViewport - The meta viewport settings.
   * @property {string} keywords - The meta keywords for the page.
   * @property {Object[]} metaSocial - The array of social network information.
   * @property {string} updatedAt - The last update time for the page.
   * @property {string} publishedAt - The published time for the page.
   * @property {string} type - The type of the page.
   * @property {string} titleTemplate - The title template for the page.
   * @param {Object} props - Component properties.
   * @param {PageMeta} props.pageMeta - The page meta information.
   */
  import { PUBLIC_ENV as ENV } from '$env/static/public';
  import MetaTags from '@components/general/MetaTags.svelte';

  /** @type {MetaTagsProps} */
  export let pageMeta;

  const {
    metaTitle,
    socialTitle,
    metaImage,
    metaDescription,
    metaRobots,
    canonicalURL,
    metaViewport,
    keywords,
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
  robots={ENV === 'production' || ENV === 'development'
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
        keywords ||
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
  twitter={twitter
    ? {
        site: '@dgrebb',
        creator: '@dgrebb',
        cardType: 'summary_large_image',
        title: twitter?.title || socialTitle || pageMeta.title,
        description: twitter?.description || pageMeta.metaDescription,
        image: twitter?.image?.data?.attributes?.url || metaImage.url,
        imageAlt:
          twitter?.image?.data?.attributes?.alternativeText || metaImage.alt,
      }
    : false}
  facebook={facebook
    ? {
        site: '@dgrebb',
        creator: '@dgrebb',
        cardType: 'summary_large_image',
        title: twitter?.title || socialTitle || pageMeta.title,
        description: twitter?.description || pageMeta.metaDescription,
        image: twitter?.image?.data?.attributes?.url || metaImage.url,
        imageAlt:
          twitter?.image?.data?.attributes?.alternativeText || metaImage.alt,
      }
    : false}
/>
