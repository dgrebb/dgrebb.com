import { error } from "@sveltejs/kit";
import api from "@api";
import { PUBLIC_API_URL as URL } from "$env/static/public";

export const trailingSlash = "always";

export async function load({ params }) {
  return {
    posts: [],
  };
}
