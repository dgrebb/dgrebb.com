const { URL } = require('../vars');
const POSTS_URL = `${URL}/posts/?roboto`;

module.exports = {
  label: 'Post - Navigate From Posts',
  url: POSTS_URL,
  delay: 100,
  onReadyScript: 'playwright/onReadyPost.js',
  clickSelector:
    'a[href*="/post/animating-page-and-view-transitions-with-accessibility-in-mind"]',
  postInteractionWait: 700,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
