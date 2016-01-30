var fs = require('fs');

function FileReader(filename) {
  fs.readFileSync(filename, "utf8");
}

module.exports = FileReader;