const { URL, upToMediumViewports } = require('../vars');
const POSTS_URL = `${URL}/posts`;

module.exports = {
  label: 'Post - Mobile Navigate From Posts',
  url: POSTS_URL,
  viewports: upToMediumViewports,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: 'a[href="/post/the-little-end-to-end-testing-engineer-who-could-a-tale-of-heroism-and-headaches/"]',
  postInteractionWait: 1000,
  selectors: ['document'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
