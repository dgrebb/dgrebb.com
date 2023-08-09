const { URL, upToMediumViewports } = require('../vars');
const POST_URL = `${URL}/post/the-little-end-to-end-testing-engineer-who-could-a-tale-of-heroism-and-headaches/`;

module.exports = {
  label: 'Post - Mobile Expand Mininav',
  url: POST_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: '.page-navigation.mini .page-navigation-toggle',
  postInteractionWait: 1000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
