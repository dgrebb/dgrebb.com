const { URL } = require('../vars');

module.exports = {
  label: 'Posts - Navigate From Home',
  url: URL,
  onReadyScript: 'playwright/onReadyPosts.js',
  clickSelector: 'a[href="/posts"]',
  postInteractionWait: 2000,
  selectors: ['document'],
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
