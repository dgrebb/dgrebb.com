import { error } from "@sveltejs/kit";
import api, { categoryAPI } from "@api";
import { PUBLIC_API_URL as URL } from "$env/static/public";

export const trailingSlash = "always";

export async function load({ params }) {
  const { category } = params;
  const categoryEndpoint = URL + `/category/${category}`;
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
