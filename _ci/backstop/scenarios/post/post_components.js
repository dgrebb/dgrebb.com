const { URL } = require('../vars');
const POSTS_URL = `${URL}/post/animating-page-and-view-transitions-with-accessibility-in-mind/?roboto`;

module.exports = {
  label: 'Post - Content Components',
  url: POSTS_URL,
  delay: 300,
  onReadyScript: 'playwright/onReadyPostComponents.js',
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
