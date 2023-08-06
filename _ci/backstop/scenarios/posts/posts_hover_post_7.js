const { URL } = require('../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Posts - Hover Seventh Post',
  url: POSTS_URL,
  onReadyScript: 'playwright/onReadyPosts.js',
  delay: 1000,
  hoverSelector: '.posts-grid li:nth-child(7) .post-link',
  postInteractionWait: 2500,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
