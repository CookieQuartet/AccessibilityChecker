var parse = require('../../../helper/XMLParserToJson.js');
var inspect = require('util').inspect;

var XMLCodeRules = [
  {
    id: 1,
    priority: 1,
    name: 'Regla 1',
    description: 'Regla de prueba de tag',
    type: 'android.xml.tag',
    match: function(code) { return true; },
    apply: function(code, ctx) {
      var startToken = code.indexOf('>');
      var comment = '\n<!-- esto es un comentario de tag -->\n';
      return code.substring(0, startToken+1) + comment + code.substring(startToken+1, code.length);
    }
  },
  {
    id: 2,
    priority: 1,
    name: 'Regla 1',
    description: 'Regla de prueba de tag',
    type: 'android.xml.tag',
    match: function(code) {
      return true;
    },
    apply: function(code, ctx) {
      var obj = parse(code, 2);
      console.log(inspect(obj, { colors: true, depth: Infinity }));
      var startToken = code.indexOf('>');
      var comment = '\n<!-- esto es un comentario de tag -->\n';
      return code.substring(0, startToken+1) + comment + code.substring(startToken+1, code.length);
    }
  }

];

module.exports = XMLCodeRules;