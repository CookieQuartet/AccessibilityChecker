var parse = require('../../../helper/XMLParserToJson.js');
var inspect = require('util').inspect;
var XMLMethods = require('./XMLParseMethods.js');

var XMLCodeRules = [
    {
        id: 1,
        priority: 1,
        name: 'Regla tamaño de button',
        description: 'Prueba del tamaño del button sea superior',
        type: 'android.xml.tag',
        match: function(code) {
            var regexButton = /^<Button/;
            var _code = code.replace(" ", "");
            if(!code.match(regexButton)){
                return false;
            }

            var statusMatch = XMLMethods.getAndroidLayoutSize(code);
            return statusMatch.match;

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