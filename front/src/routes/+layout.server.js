import { error } from "@sveltejs/kit";
import api from "../api";
import { PUBLIC_API_URL as endpoint } from "$env/static/public";

const navigationEndpoint = `${endpoint}/navigation?populate=*`;
const footerEndpoint = `${endpoint}/footer?populate=*`;

export async function load({ params }) {
  const navigationContent = await api(navigationEndpoint);
  const footerContent = await api(footerEndpoint);
  return {
    ...navigationContent.attributes,
    ...footerContent.attributes
  };
}
