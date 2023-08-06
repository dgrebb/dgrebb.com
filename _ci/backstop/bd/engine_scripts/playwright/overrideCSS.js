const BACKSTOP_TEST_CSS_OVERRIDE = `
  * {
    transition: none !important; 
    transition-duration: 0 !important; 
    transition-delay: 0 !important;
  } 
  html {
    background-image: none;
  }
  body {
    height: 100% !important;
    min-height: 100% !important;
  }
`;

module.exports = async (page, scenario) => {
  // inject arbitrary css to override styles
  await page.addStyleTag({
    content: BACKSTOP_TEST_CSS_OVERRIDE,
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};
