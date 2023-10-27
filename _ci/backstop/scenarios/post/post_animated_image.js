const { URL } = require('../vars');
const POST_URL = `${URL}/post/animating-page-and-view-transitions-with-accessibility-in-mind/?roboto`;
const { aboveSmallViewports } = require('../vars.js');

module.exports = {
  label: 'Post - Animated Image',
  url: POST_URL,
  viewports: aboveSmallViewports,
  onReadyScript: 'playwright/onReadyPost.js',
  delay: 333,
  selectors: ['.post :nth-child(1 of .animated-image)'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
