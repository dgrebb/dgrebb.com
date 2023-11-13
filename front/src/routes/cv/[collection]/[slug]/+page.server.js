import {
  PUBLIC_API_PATH_POSITIONS as POS,
  PUBLIC_API_URL as URL,
} from '$env/static/public';
import api from '@api';
import {
  shapePositionData,
  shapeProjectData,
  shapeSkillData,
} from '@shape-shifters';
import { error } from '@sveltejs/kit';

async function requestContent(endpoint, collection) {
  let responseData;
  try {
    responseData = await api(endpoint);
  } catch (error) {
    console.warn(`${collection} Collection Item page API error.`);
    console.error(error);
  }
  return responseData;
}

export async function load({ params: { collection, slug } }) {
  let endpoint = `${URL}/${collection}s`;
  let data, itemData;

  switch (collection) {
    case 'position':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapePositionData(data);
      break;
    case 'project':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&populate[positions]=*&populate[artifacts][on][artifacts.websites][populate]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeProjectData(data);
      break;
    case 'skill':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&populate[classification]=*&populate[positions]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeSkillData(data);
      break;
  }

  if (!data) {
    throw error(500, `${collection} Collection Item Page Error`);
  }

  return {
    slug,
    collection,
    itemData,
  };
}
