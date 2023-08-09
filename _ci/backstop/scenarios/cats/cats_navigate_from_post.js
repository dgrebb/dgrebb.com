const { URL, aboveSmallViewports } = require('../vars');
const POST_URL = `${URL}/post/the-little-end-to-end-testing-engineer-who-could-a-tale-of-heroism-and-headaches/`;

module.exports = {
  label: 'Cats - Navigate from Post',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'playwright/onReadyCats.js',
  clickSelector: '.post-aside a[href="/posts/category/development/"]',
  postInteractionWait: 1000,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
