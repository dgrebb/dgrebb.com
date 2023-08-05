const { URL } = require('../../vars');

module.exports = {
  label: 'Homepage',
  url: URL,
  colorScheme: 'dark',
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
