const { URL, upToMediumViewports } = require('../vars');
const CATS_URL = `${URL}/posts/category/thoughts/?roboto`;

module.exports = {
  label: 'Cats - Active "Thoughts" Category',
  url: CATS_URL,
  viewports: upToMediumViewports,
  delay: 300,
  onReadyScript: 'playwright/onReadyCatsMiniNav.js',
  postInteractionWait: 100,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
