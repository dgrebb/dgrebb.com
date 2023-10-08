const { URL, upToMediumViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/thoughts/`;

module.exports = {
  label: 'Cats - Active "Thoughts" Category',
  url: CATS_URL,
  viewports: upToMediumViewports,
  delay: 2000,
  onReadyScript: 'playwright/onReadyCatsMiniNav.js',
  postInteractionWait: 2000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
