import { error } from "@sveltejs/kit";
import api from "../../api";
import { PUBLIC_API_URL, PUBLIC_API_PATH_PRIVACY } from "$env/static/public";

const privacyEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_PRIVACY}`;

export async function load({ params }) {
  const privacyContent = await api(privacyEndpoint);
  if (privacyContent.error) {
    throw error(500, "Privacy Page Error", "/404");
  }
  return {
    ...privacyContent.attributes,
  };
}
