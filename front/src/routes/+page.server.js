import { error } from "@sveltejs/kit";
import api from "../api";
import { PUBLIC_API_URL as endpoint } from "$env/static/public";

const homeEndpoint = `${endpoint}/home?populate=*`;

export async function load({ params }) {
  const homeContent = await api(homeEndpoint);
  if (!homeContent) {
    throw error(404, '/not-found whatever you want');
  }
  return {
    ...homeContent.attributes
  };
}
