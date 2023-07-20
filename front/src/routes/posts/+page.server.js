import { error } from "@sveltejs/kit";
import api from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_POSTS_PAGE as PAGE,
  PUBLIC_API_PATH_POSTS as POSTS,
  PUBLIC_POSTS_PREVIEW_PARAMS as PARAMS,
} from "$env/static/public";

const pageEndpoint = URL + PAGE;
const postsEndpoint = URL + POSTS + PARAMS;

export async function load({ route }) {
  const [page, posts] = await Promise.all([
    api(pageEndpoint),
    api(postsEndpoint),
  ]);

  if (!page) {
    console.error({
      route: route.id,
      endpoint: pageEndpoint,
      error: page.error,
    });
  }

  if (!posts.length) {
    console.error({
      route,
      endpoint: postsEndpoint,
      error: posts.error,
    });
  }

  return {
    page: page || {},
    posts: posts || [],
  };
}
