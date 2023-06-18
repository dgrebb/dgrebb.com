import { error } from "@sveltejs/kit";
import api from "../api";
import { PUBLIC_API_URL, PUBLIC_API_PATH_HOME } from "$env/static/public";

const homeEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_HOME}`;

export async function load({ params }) {
  const homeContent = await api(homeEndpoint);
  if (!homeContent) {
    throw error(404, "/404");
  }
  return {
    ...homeContent.attributes,
  };
}
