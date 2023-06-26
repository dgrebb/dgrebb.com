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

export async function load({ params }) {
  const navigationContent = await api(navigationEndpoint);
  const footerContent = await api(footerEndpoint);
  
  let { error: { error } } = navigationContent || footerContent || false;

  if (error) {
    throw error(500, {
      message: `Layout Error: ${error}`
    });
  }

  return {
    ...navigationContent.attributes,
    ...footerContent.attributes,
  };
}
