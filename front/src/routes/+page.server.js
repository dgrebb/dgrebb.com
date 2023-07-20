import { error } from "@sveltejs/kit";
import api from "@api";
import {
  PUBLIC_API_URL as URL,
  PUBLIC_API_PATH_HOME as HOME,
} from "$env/static/public";

const endpoint = URL + HOME;

export async function load({ params }) {
  const home = await api(endpoint);

  if (!home) {
    throw error(500, "Home Page Error");
  }

  return home;
}
