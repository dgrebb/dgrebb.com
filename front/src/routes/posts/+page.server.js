import { error } from "@sveltejs/kit";
import api from "../../api";
import {
  PUBLIC_API_URL,
  PUBLIC_API_PATH_POSTS_PAGE,
  PUBLIC_API_PATH_POSTS,
  PUBLIC_POSTS_PREVIEW_PARAMS,
} from "$env/static/public";

const postsPageEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_POSTS_PAGE}`;
const postsEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_POSTS}${PUBLIC_POSTS_PREVIEW_PARAMS}`;

export const trailingSlash = "always";

export async function load({ params }) {
  const postsPageContent = await api(postsPageEndpoint);
  const postsContent = await api(postsEndpoint);
  if (!postsPageContent.attributes) {
    // throw error(500, {
    //   message: `Posts Page Error: ${error}`,
    // });
    console.table({
      route: $page.route.id,
      params,
      postsPageEndpoint,
      postsEndpoint,
      content: {
        postsPageContent
      },
    });
  }
  if (!postsContent) {
    // throw error(500, {
    //   message: `Posts Error: ${error}`,
    // });
    console.table({
      route: $page.route.id,
      params,
      postsPageEndpoint,
      postsEndpoint,
      content: {
        postsContent
      },
    });
  }
  return {
    postsPageContent: { ...postsPageContent.attributes },
    posts: [...postsContent],
  };
}
