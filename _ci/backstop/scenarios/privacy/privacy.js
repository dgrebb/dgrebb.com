var fs = require("fs");
fs.readdirSync(__dirname).forEach(function(file) {
  if (file.indexOf(".js") > -1 && file != "privacy.js") {
    exports[file.replace(".js", "")] = require("./" + file);
  }
});