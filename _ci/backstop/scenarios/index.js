var fs = require("fs");

// Read through scenario directories, their main 
// manifest file, and export their tests by name
fs.readdirSync("./scenarios", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((dir) =>
    fs.readdirSync(`./scenarios/${dir.name}`).forEach(function(file) {
      if (file.indexOf(`${dir.name}.js`) > -1 && file != "index.js") {
        exports[file.replace(".js", "")] = require(`${__dirname}/${dir.name}/${file}`);
      }
    })
  );