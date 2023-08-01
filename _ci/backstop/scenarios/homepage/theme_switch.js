const { URL } = require("../../vars");

module.exports = {
  label: "Local Home Theme Switch",
  url: URL,
  referenceUrl: "",
  readyEvent: "",
  readySelector: "",
  delay: 0,
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: "",
  clickSelector: ".theme-toggle",
  postInteractionWait: 2000,
  selectors: [],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 0.1,
  requireSameDimensions: true,
};
