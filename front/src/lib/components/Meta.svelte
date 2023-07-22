<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import { MetaTags } from "svelte-meta-tags";

  export let pageMeta;
  let mounted = false;

  const {
    metaTitle,
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
      height: metaImage?.width || 900,
      alt: metaImage?.alternativeText,
    },
  ];

  const twitter =
    metaSocial?.find((obj) => obj.socialNetwork === "Twitter") || false;

  const facebook =
    metaSocial?.find((obj) => obj.socialNetwork === "Facebook") || false;
</script>

<MetaTags
  title={metaTitle || "Dan Grebb"}
  {titleTemplate}
  description={metaDescription ||
    "Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania."}
  robots={metaRobots || undefined}
  canonical={canonicalURL}
  additionalMetaTags={[
    {
      name: "viewport",
      content: metaViewport || "width=device-width, initial-scale=1",
    },
    {
      name: "keywords",
      content:
        metaKeywords ||
        "Dan Grebb, dgrebb, software, engineer, volunteer, craft, developer, web, Philadelphia, Pennsylvania",
    },
  ]}
  openGraph={{
    title: metaTitle,
    description: metaDescription,
    url: canonicalURL,
    type: type === "post" ? "article" : "website",
    article: type === "post" && {
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
    },
    images: OGImages,
  }}
  twitter={{
    site: "@dgrebb",
    creator: "@dgrebb",
    cardType: "summary_large_image",
    title: twitter?.title || pageMeta.title,
    description: twitter?.description || pageMeta.description,
    image: twitter?.image?.data?.attributes?.url || metaImage.url,
    imageAlt:
      twitter?.image?.data?.attributes?.alternativeText || metaImage.alt,
  }}
/>
