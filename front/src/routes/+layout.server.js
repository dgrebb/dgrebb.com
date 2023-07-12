import { error } from "@sveltejs/kit";
import api from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_NAVIGATION as NAV,
  PUBLIC_API_PATH_FOOTER as FOOT,
} from "$env/static/public";

export const prerender = true;

const navigationEndpoint = URL + NAV;
const footerEndpoint = URL + FOOT;

export async function load({ url: { pathname } }) {
  const [navigationContent, footerContent] = await Promise.all([
    api(navigationEndpoint),
    api(footerEndpoint),
  ]);

  if (!navigationContent || !footerContent) {
    throw error(500, {
      message: "Layout Error",
    });
  }

  return {
    ...navigationContent,
    ...footerContent,
    pathname,
  };
}
