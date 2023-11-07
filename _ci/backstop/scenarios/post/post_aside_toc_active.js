const { URL } = require('../vars');
const POST_URL = `${URL}/post/hello-world/?roboto#what`;
const { aboveSmallViewports } = require('../vars.js');

module.exports = {
  label: 'Post - Aside TOC Active Item Onload',
  url: POST_URL,
  viewports: aboveSmallViewports,
  delay: 533,
  selectors: ['.post .aside'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
