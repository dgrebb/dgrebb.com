const { URL } = require('../vars');

module.exports = {
  label: 'Homepage - Switch Theme',
  url: URL + '?roboto',
  delay: 500,
  colorScheme: 'dark',
  clickSelector: '.theme-toggle',
  postInteractionWait: 1000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: false,
};
