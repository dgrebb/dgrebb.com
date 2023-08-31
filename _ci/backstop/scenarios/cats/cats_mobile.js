const { URL, upToMediumViewports } = require('../vars');
const POST_URL = `${URL}/posts/category/development/`;

module.exports = {
  label: 'Cats - Mobile',
  url: POST_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyCats.js',
  postInteractionWait: 800,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
