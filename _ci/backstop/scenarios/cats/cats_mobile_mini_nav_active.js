const { URL, upToMediumViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/development/`;

module.exports = {
  label: 'Cats - Active "Tests" Category',
  url: CATS_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyCatsMiniNav.js',
  clickSelector: '.page-navigation.mini.top a[href="/posts/category/tests/"]',
  postInteractionWait: 2000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
