const BACKSTOP_TEST_CSS_OVERRIDE = `
  * {
    transition: none !important; 
    transition-duration: 0 !important; 
    transition-delay: 0 !important;
  } 
  html {
    overflow: auto;
  } 
  body {
    overflow: visible !important;
    height: 100%;
    min-height: 100%;
  }
`;

module.exports = async (page, scenario) => {
  await page.addStyleTag({
    content: BACKSTOP_TEST_CSS_OVERRIDE,
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};