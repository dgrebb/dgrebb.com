const { homepage_default, privacy_default } = require("./scenarios");

module.exports = {
  id: "dgrebb.com",
  viewports: [
    {
      label: "xs",
      width: 320,
      height: 480,
    },
    {
      label: "sm",
      width: 375,
      height: 667,
    },
    {
      label: "md",
      width: 768,
      height: 1024,
    },
    {
      label: "lg",
      width: 1024,
      height: 768,
    },
    {
      label: "xl",
      width: 1280,
      height: 960,
    },
    {
      label: "2xl",
      width: 1536,
      height: 1280,
    },
  ],
  onBeforeScript: "puppet/onBefore.js",
  onReadyScript: "puppet/onReady.js",
  scenarios: [homepage_default, privacy_default],
  paths: {
    bitmaps_reference: "bd/bitmaps_reference",
    bitmaps_test: "bd/bitmaps_test",
    engine_scripts: "bd/engine_scripts",
    html_report: "bd/html_report",
    ci_report: "bd/ci_report",
  },
  report: ["browser"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
    headless: "new",
  },
  asyncCaptureLimit: 10,
  asyncCompareLimit: 100,
  debug: false,
  debugWindow: false,
};
