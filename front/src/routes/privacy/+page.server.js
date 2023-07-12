import { error } from "@sveltejs/kit";
import api from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_PRIVACY as PRIVACY,
} from "$env/static/public";

export const trailingSlash = "always";
const endpoint = URL + PRIVACY;

export async function load({ params }) {
  const privacyContent = await api(endpoint);
  if (!privacyContent) {
    throw error(500, {
      message: `Privacy Page Error: ${error}`,
    });
  }
  return {
    ...privacyContent,
  };
}
