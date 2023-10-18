const { URL } = require('../vars');

module.exports = {
  label: 'Homepage',
  url: URL + '?roboto',
  colorScheme: 'dark',
  delay: 1000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
