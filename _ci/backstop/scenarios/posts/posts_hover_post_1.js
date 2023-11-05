const { URL, sm, aboveSmallViewports } = require('../vars');
const POSTS_URL = `${URL}/posts/?roboto`;

module.exports = {
  label: 'Posts - Hover First Post',
  url: POSTS_URL,
  viewports: [sm, ...aboveSmallViewports],
  onReadyScript: 'playwright/onReadyPosts.js',
  hoverSelector: '.posts-grid li:first-of-type .posts-grid-link',
  postInteractionWait: 100,
  selectors: ['document'],
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
