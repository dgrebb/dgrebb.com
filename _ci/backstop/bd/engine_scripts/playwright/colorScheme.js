module.exports = async (page, scenario) => {
  if (scenario.colorScheme) {
    await page.emulateMedia({ colorScheme: scenario.colorScheme });
  }

  console.log('Updated color scheme for: ' + scenario.label);
};
