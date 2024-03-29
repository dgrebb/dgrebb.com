const { URL } = require('../vars');

module.exports = {
  label: 'Homepage',
  url: URL + '?roboto',
  colorScheme: 'dark',
  onReadyScript: 'playwright/onReadyHome.js',
  delay: 500,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
