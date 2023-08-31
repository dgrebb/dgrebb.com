const { URL, upToMediumViewports } = require('../vars');
const POST_URL = `${URL}/post/the-little-end-to-end-testing-engineer-who-could-a-tale-of-heroism-and-headaches/#ladies-and-gentlemen`;

module.exports = {
  label: 'Post - Mobile Mininav TOC Active Onload',
  url: POST_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: '.page-navigation.mini .page-navigation-toggle',
  postInteractionWait: 1000,
  selectors: ['.page-navigation.mini'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
