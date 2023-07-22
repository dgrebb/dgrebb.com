import { error } from "@sveltejs/kit";
import api, { categoryAPI } from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_API_PATH_CATEGORY as CAT,
  PUBLIC_CATEGORY_PAGE_PARAMS as PARAMS,
} from "$env/static/public";

export async function load({ params }) {
  const { category } = params;
  const categoryEndpoint = URL + CAT + category;
  const postsEndpoint = URL + POSTS + PARAMS;
  const [content, posts] = await Promise.all([
    categoryAPI(categoryEndpoint),
    api(postsEndpoint),
  ]);

  if (!content) {
    console.info({
      params,
      postsEndpoint,
      categoryEndpoint,
    });
    throw error(404, {
      message: "Category not found!",
    });
  }


  const { name, seo } = content;

  const pageMeta = {
    ...seo,
    type: "website",
    metaTitle: seo?.metaTitle || name,
    titleTemplate: "%s | Categories | Dan Grebb",
    metaDescription: seo?.metaDescription || `Here's a collection of posts about ${name}`,
  };
  
  /**
   * Isolates the `metaImage` object properties we care about
  */
 pageMeta.metaImage = pageMeta?.metaImage?.data?.attributes || {
   url: "https://s.dgrebb.com/img/default_banner_2a50e43220.png",
   alternativeText: "The Circuit of Life",
  };
  
  console.log("🚀 ~ file: +page.server.js:34 ~ load ~ pageMeta:", pageMeta)
  return {
    content,
    posts: [...posts] || [],
    pageMeta,
  };
}
