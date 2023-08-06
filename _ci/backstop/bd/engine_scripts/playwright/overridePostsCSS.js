const BACKSTOP_TEST_CSS_OVERRIDE = `
  * {
    transition: none !important; 
    transition-duration: 0 !important; 
    transition-delay: 0 !important;
  } 
  html {
  } 
  body {
    overflow: visible !important;
    position: absolute !important;
    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
  }
`;

module.exports = async (page, scenario) => {
  await page.addStyleTag({
    content: BACKSTOP_TEST_CSS_OVERRIDE,
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};