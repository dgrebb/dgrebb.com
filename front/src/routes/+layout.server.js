import { error } from "@sveltejs/kit";
import api from "../api";
import {
  PUBLIC_API_URL,
  PUBLIC_API_PATH_NAVIGATION,
  PUBLIC_API_PATH_FOOTER,
} from "$env/static/public";

export const prerender = true;

const navigationEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_NAVIGATION}`;
const footerEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_FOOTER}`;

export async function load({ url }) {
  const navigationContent = await api(navigationEndpoint);
  const footerContent = await api(footerEndpoint);
  const { pathname } = url;

  if (!navigationContent.attributes || !footerContent.attributes) {
    throw error(500, {
      message: "Layout Error",
    });
  }

  return {
    ...navigationContent.attributes,
    ...footerContent.attributes,
    pathname,
  };
}
