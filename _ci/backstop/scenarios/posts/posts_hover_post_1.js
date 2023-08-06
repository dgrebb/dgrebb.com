const { URL } = require('../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Posts - Hover First Post',
  url: POSTS_URL,
  onReadyScript: 'playwright/onReadyPosts.js',
  hoverSelector: '.posts-grid li:nth-child(1) .post-link',
  postInteractionWait: 2500,
  selectors: ['document'],
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
