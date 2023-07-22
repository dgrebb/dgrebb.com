<script>
  import { PUBLIC_MEDIA_URL as M } from "$env/static/public";
  import { MetaTags } from "svelte-meta-tags";

  export let pageMeta;
  $: console.log("🚀 ~ file: Meta.svelte:6 ~ pageMeta:", pageMeta);

  let mounted = false;
  let OGImageProp,
    OGImage,
    OGImageWidth,
    OGImageHeight,
    OGImageAlt,
    twitter,
    twitterImageProp,
    twitterImage,
    twitterImageAlt;

  $: {
    OGImage = OGImageProp?.large
      ? M + OGImageProp.large?.url
      : pageMeta?.heroImage ||
        "https://s.dgrebb.com/img/default_posts_813772ab64.png";
    OGImageWidth = OGImageProp.large?.width || OGImageProp.medium?.width;
    OGImageHeight = OGImageProp.large?.height || OGImageProp.medium?.height;
    OGImageAlt =
      pageMeta?.metaImage?.data?.attributes?.alternativeText ||
      "The Circuit of Life";

    twitterImageProp = twitter?.image?.data?.attributes || false;
    twitterImage = twitterImageProp?.formats?.large
      ? M + twitterImageProp?.formats.large?.url
      : pageMeta?.heroImage ||
        "https://s.dgrebb.com/img/default_posts_813772ab64.png";
    twitterImageAlt =
      twitterImageProp?.alternativeText || "The Circuit of Life";
  }
</script>

<MetaTags
  title={pageMeta?.metaTitle || pageMeta?.title || "Dan Grebb"}
  titleTemplate={pageMeta?.titleTemplate}
  description={pageMeta?.metaDescription ||
    "Dan Grebb is a Software Engineer from Philadelphia, Pennsylvania."}
  robots={pageMeta?.metaRobots || undefined}
  canonical={pageMeta.canonicalURL}
  additionalMetaTags={[
    {
      name: "viewport",
      content: pageMeta?.metaViewport || "width=device-width, initial-scale=1",
    },
    {
      name: "keywords",
      content:
        pageMeta?.keywords ||
        "Dan Grebb, dgrebb, software, engineer, volunteer, craft, developer, web, Philadelphia, Pennsylvania",
    },
  ]}
  openGraph={{
    title: pageMeta.title,
    description: pageMeta.metaDescription,
    url: pageMeta.canonicalURL,
    type: pageMeta.type === "post" ? "article" : "website",
    article: pageMeta.type === "post" && {
      publishedTime: pageMeta.publishedAt,
      modifiedTime: pageMeta.updatedAt,
    },
    images: [
      {
        url: OGImage,
        width: OGImageWidth || 1600,
        height: OGImageHeight || 900,
        alt: OGImageAlt,
      },
    ],
  }}
  twitter={{
    site: "@dgrebb",
    creator: "@dgrebb",
    cardType: "summary_large_image",
    title: twitter?.title || pageMeta.title,
    description: twitter?.description || pageMeta.description,
    image: twitterImage,
    imageAlt: twitterImageAlt,
  }}
/>
