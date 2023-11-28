module.exports = async (page, scenario) => {
  await page.evaluate((scenario) => {
    document
      .querySelector('.page-navigation.mini.top .page-navigation-toggle')
      .click();
    console.log('EXPANDING MININAV FOR: ' + scenario.label);
  }, scenario);
};
