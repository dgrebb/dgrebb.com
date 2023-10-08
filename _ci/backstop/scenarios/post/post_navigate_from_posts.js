const { URL } = require('../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Post - Navigate From Posts',
  url: POSTS_URL,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: 'a[href="/post/hello-world/"]',
  postInteractionWait: 1500,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
