module.exports = async (page, scenario) => {
  await page.evaluate((scenario) => {
    const miniNavToggle = document.querySelector(
      '.page-navigation.mini.top .page-navigation-toggle'
    );

    if (miniNavToggle) {
      miniNavToggle.click();
      console.log('EXPANDING MININAV FOR: ' + scenario.label);
    }
  }, scenario);
};
