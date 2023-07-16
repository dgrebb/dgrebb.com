import { error } from "@sveltejs/kit";
import api, { categoryAPI } from "@api";
import { PUBLIC_API_URL as URL, PUBLIC_API_PATH_CATEGORY as CAT, PUBLIC_CATEGORY_PAGE_PARAMS as PARAMS } from "$env/static/public";

export const trailingSlash = "always";

export async function load({ params }) {
  const { category } = params;
  const categoryEndpoint = URL + URL + PARAMS + category;
  const postsEndpoint =
    URL +
    `/posts/?pagination[page]=1&pagination[pageSize]=10&sort[0]=createdAt:desc&filters[categories][slug][$eq]=${category}&populate=hero`;
  const [content, posts] = await Promise.all([
    categoryAPI(categoryEndpoint),
    api(postsEndpoint),
  ]);

  if (!content) {
    console.error({
      route: route.id,
      endpoint: pageEndpoint,
      error: page.error,
    });
  }

  return {
    content,
    posts: [...posts] || [],
  };
  
}
