var parse = require('../../../helper/XMLParserToJson.js');
var inspect = require('util').inspect;

var XMLCodeRules = [
        /*
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
  },
    */
    {
        id: 3,
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

            var widthString = "android:layout_width";
            var heigthString = "android:layout_height";
            var widthPosition = _code.indexOf(widthString);
            var heigthPosition = _code.indexOf(heigthString);
            var valueRegexSingleQuote = /'[^']+'/;
            var valueRegexDoubleQuote = /"[^"]+"/;

            if(widthPosition == -1 && heigthPosition == -1)
                return false; //No tiene width ni heigth

            if(widthPosition != -1){
                widthPosition+=widthString.length;
            }

            if(heigthPosition != -1){
                heigthPosition+=heigthString.length;
            }

            var resultWidth = _code.slice(widthPosition, _code.length).match(valueRegexSingleQuote);
            if(!resultWidth){
                resultWidth = _code.slice(widthPosition, _code.length).match(valueRegexDoubleQuote);
            }

            var resultHeight = _code.slice(heigthPosition, _code.length).match(valueRegexSingleQuote);
            if(!resultHeight){
                resultHeight = _code.slice(heigthPosition, _code.length).match(valueRegexDoubleQuote);
            }

            if(resultWidth){
                var widthValue = resultWidth[0].match(/\d+/);
                if(widthValue && widthValue[0] < 48){
                    return true
                }
            }

            if(resultHeight){
                var heightValue = resultHeight[0].match(/\d+/);
                if(heightValue && heightValue[0] < 48){
                    return true
                }
            }

            return false;
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