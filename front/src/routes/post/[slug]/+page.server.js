import { error } from "@sveltejs/kit";
import api from "../../../api";
import {
  PUBLIC_API_URL,
  PUBLIC_API_PATH_POST,
  PUBLIC_POST_PARAMS,
} from "$env/static/public";

export const trailingSlash = "always";

export async function load({ params: { slug }, route }) {
  const postEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_POST}${slug}${PUBLIC_POST_PARAMS}`;
  const postContent = await api(postEndpoint);
  if (!postContent.attributes) {
    // throw error(500, {
    //   message: `Post Page Error: ${error}`,
    // });
    console.error({
      route,
      slug,
      endpoint: postEndpoint,
      error: postContent.error,
    });
  }
  return {
    post: postContent.attributes || {},
  };
}
