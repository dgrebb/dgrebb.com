var fs = require("fs");

// Read in the libs from this directory and add them as exports
// This way you can just reference
fs.readdirSync("./scenarios").forEach(function(file) {
  console.log(file);
  if (file.indexOf(".js") > -1 && file != "index.js")
    exports[file.replace(".js", "")] = require("./" + file);
});
