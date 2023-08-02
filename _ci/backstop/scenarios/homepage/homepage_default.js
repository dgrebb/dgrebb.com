const { URL } = require("../../vars");

module.exports = {
  label: "Homepage",
  // cookiePath: "backstop/backstop_data/engine_scripts/cookies.json",
  url: URL,
  referenceUrl: "",
  readyEvent: "",
  readySelector: "",
  delay: 1200,
  hideSelectors: [],
  removeSelectors: [],
  hoverSelector: "",
  clickSelector: "",
  postInteractionWait: 0,
  selectors: [],
  selectorExpansion: true,
  expect: 0,
  misMatchThreshold: 0.2,
  requireSameDimensions: true,
};
