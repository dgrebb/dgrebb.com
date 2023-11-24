module.exports = async (page, scenario) => {
  if (scenario.colorScheme) {
    await page.emulateMedia({ colorScheme: scenario.colorScheme });
  } else {
    await page.emulateMedia({ colorScheme: 'dark' });
  }

  console.log('Updated color scheme for: ' + scenario.label);
};
