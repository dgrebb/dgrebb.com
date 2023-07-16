import { error } from "@sveltejs/kit";
import api, { categoryAPI } from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_API_PATH_CATEGORY as CAT,
  PUBLIC_CATEGORY_PAGE_PARAMS as PARAMS,
} from "$env/static/public";

export const trailingSlash = "always";

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

  return {
    content,
    posts: [...posts] || [],
  };
}
