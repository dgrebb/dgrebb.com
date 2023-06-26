import { error } from "@sveltejs/kit";
import api from "../api";
import { PUBLIC_API_URL, PUBLIC_API_PATH_HOME } from "$env/static/public";

const homeEndpoint = `${PUBLIC_API_URL}${PUBLIC_API_PATH_HOME}`;

export const trailingSlash = "always";

export async function load({ params }) {
  const homeContent = await api(homeEndpoint);

  if (!homeContent.attributes) {
    throw error(500, {
      message: "Home Page Error"
    });
  }
  return {
    ...homeContent.attributes,
  };
}
