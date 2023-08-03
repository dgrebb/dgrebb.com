const { URL } = require('../../vars');

module.exports = {
  label: 'Posts - Navigate From Home',
  url: URL,
  readyEvent: '',
  readySelector: '',
  delay: 0,
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: '',
  clickSelector: 'a[href="/posts"]',
  postInteractionWait: 1200,
  selectors: ['document'],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
