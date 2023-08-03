var fs = require('fs');

const scenarioExports = async () => {
    fs.readdirSync(__dirname).forEach(function (file) {
      if (file.indexOf('.js') > -1 && file != 'index.js') {
        exports[file.replace('.js', '')] = require('./' + file);
      }
    });
  },
  exports = {
    scenarioExports: scenarioExports(),
  };
