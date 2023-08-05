const { URL } = require('../../vars');

module.exports = {
  label: 'Homepage - Switch Theme',
  url: URL,
  delay: 500,
  clickSelector: ".theme-toggle",
  postInteractionWait: 2000,
  selectors: ['viewport'],
  selectorExpansion: false,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
