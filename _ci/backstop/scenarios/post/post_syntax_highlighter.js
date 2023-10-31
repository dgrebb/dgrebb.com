const { URL } = require('../vars');
const POST_URL = `${URL}/post/animating-page-and-view-transitions-with-accessibility-in-mind/?roboto`;
const { allViewports } = require('../vars.js');

module.exports = {
  label: 'Post - Syntax Highlighter',
  url: POST_URL,
  viewports: allViewports,
  delay: 333,
  onReadyScript: 'playwright/onReadyPost.js',
  selectors: ['.post :nth-child(1 of .syntax-highlighter)'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
