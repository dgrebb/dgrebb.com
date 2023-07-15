import { error } from "@sveltejs/kit";
import api from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POST as POST,
  PUBLIC_POST_PARAMS as PARAMS,
} from "$env/static/public";

export const trailingSlash = "always";

export async function load({ params: { slug }, route }) {
  const endpoint = URL + POST + slug + PARAMS;
  const post = await api(endpoint);

  if (!post) {
    // throw error(500, {
    //   message: `Post Page Error: ${error}`,
    // });
    console.error({
      route,
      slug,
      endpoint: endpoint,
      error: post?.error,
    });
  }

  return {
    post: post || {},
  };
}
