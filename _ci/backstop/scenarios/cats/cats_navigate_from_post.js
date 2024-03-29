const { URL, aboveSmallViewports } = require('../vars');
const POST_URL = `${URL}/post/hello-world/?roboto`;

module.exports = {
  label: 'Cats - Navigate from Post',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'playwright/onReadyCats.js',
  clickSelector: '.post .aside a[href*="/posts/category/thoughts"]',
  postInteractionWait: 400,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
