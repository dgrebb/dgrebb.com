const BACKSTOP_TEST_CSS_OVERRIDE = `
  * {
    transition: none !important; 
    transition-duration: 0 !important; 
    transition-delay: 0 !important;
  } 
  .bio {
    padding-left: 1.5rem;
  }
`;

module.exports = async (page, scenario) => {
  await page.addStyleTag({
    content: BACKSTOP_TEST_CSS_OVERRIDE,
  });

  console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};
