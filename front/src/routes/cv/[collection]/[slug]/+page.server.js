import { PUBLIC_API_URL as URL } from '$env/static/public';
import api from '@api';
import {
  shapeAwardData,
  shapeCertificationData,
  shapeClassificationData,
  shapeIndustryData,
  shapeOrganizationData,
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
  var endpoint = `${URL}/${collection}s`;
  let data, itemData;

  switch (collection) {
    case 'award':
      endpoint += `?populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[p]=*&populate[positions]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeAwardData(data);
      break;
    case 'certification':
      endpoint += `?populate[seo]=*&populate[skills]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeCertificationData(data);
      break;
    case 'classification':
      endpoint += `?populate[seo]=*&populate[skills]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeClassificationData(data);
      break;
    case 'industry':
      endpoint = `${URL}/industries?populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[awards]=*&populate[positions]=*&populate[images]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeIndustryData(data);
      break;
    case 'organization':
      endpoint += `?populate[seo]=*&populate[skills]=*&populate[projects]=*&populate[industries]=*&populate[positions]=*&populate[images]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeOrganizationData(data);
      break;
    case 'position':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapePositionData(data);
      break;
    case 'project':
      endpoint += `?populate[hero]=*&populate[seo]=*&populate[skills]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&populate[classification]=*&populate[positions]=*&populate[artifacts][on][artifacts.websites][populate]=*&populate[artifacts][on][artifacts.videos][populate]=*&filters[slug][$eq]=${slug}`;
      data = await requestContent(endpoint, collection);
      itemData = await shapeProjectData(data);
      break;
    case 'skill':
      endpoint += `?populate[hero]=*&populate[icon]=*&populate[seo]=*&populate[certifications]=*&populate[organizations]=*&populate[projects]=*&populate[industries]=*&populate[awards]=*&populate[classifications]=*&populate[positions]=*&filters[slug][$eq]=${slug}`;
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
