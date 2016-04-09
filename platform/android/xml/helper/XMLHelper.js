var _ = require('lodash');
var XMLConstants = require('./XMLConstants.js');

var ColorContrastChecker = require('color-contrast-checker/src/colorContrastChecker');

module.exports = {

    //Retorna el valor del primer parametro encontrado
    getParameter: function (code, parameter) {
        var _code = this.removeSpaces(code);
        var parameterIndexOf = _code.indexOf(parameter);

        if(parameterIndexOf  == -1 ) {
            return false; //Parametro no encontrado
        }

        var value = _code.slice(parameterIndexOf, _code.length).match(new RegExp("\"[^\"]+\"|\'[^\']+\'"))[0];

        return value.slice(1, value.length - 1);
    },

    getNumericValueFromParameter: function (parameter) {
        parameter = parameter.match(/\d+/)
        return parameter ? parameter[0] : null;
    },

    getUnitValueFromParameter: function (parameter) {
        if (this.getNumericValueFromParameter(parameter) != null){
            var unit = parameter.slice(parameter.length-2, parameter.length);

            if(_.includes(XMLConstants.UNITS, unit)){
                return unit
            }
        }
        return null;
    },

    removeSpaces: function (str) {
        return str.replace(/\s+/g, '');
    },

    verifyFirstElement: function (code, element) {
        return code.match(new RegExp('^' + element));
    },

    verifyFirstElementOnElements: function (code, elements) {
        var that = this;
        return !_.isEmpty(_.filter(elements, function(element){return that.verifyFirstElement(code, element)}));
    },

    replaceNumericParameterValue: function (code, parameter, numericValue, attribute) {
        var splittedCode = this.splitCode(code, parameter, attribute);
        return splittedCode[0] + splittedCode[1].replace(splittedCode[1].match(parameter)[0].match(/\d+/), numericValue) + splittedCode[2];
    },

    replaceUnitParameterValue: function (code, parameter, unit, attribute) {
        var splittedCode = this.splitCode(code, parameter, attribute);
        return splittedCode[0] + splittedCode[1].replace(splittedCode[1].match(parameter)[0].match((/[A-z]\w+/g)), unit) + splittedCode[2];
    },

    splitCode: function(code, parameter, attribute){
        var indexStartAttribute = code.indexOf(attribute)+attribute.length;
        var indexStartParameter = indexStartAttribute + code.substring(indexStartAttribute).indexOf(parameter);

        var startText = code.substring(
            0,
            indexStartParameter
        );

        var endText = code.substring(
            indexStartParameter+parameter.length,
            code.length
        );

        var text = code.substring(
            indexStartParameter,
            indexStartParameter+parameter.length
        );

        return [startText, text, endText];
    },

    addParameter: function (code, parameter) {
//        var i = code.indexOf(" ");
//        return code.slice(0, i) + parameter + "\r\n" + code.slice(i)
        var i = code.indexOf("\r\n");
        return code.slice(0, i+2) + parameter + "\r\n" + code.slice(i+2)
    },

    makeParameter: function (parameterKey, parameterValue) {
        return parameterKey + "\"" + parameterValue + "\"";
    },

    isHexColor: function (color) {
        return color.charAt(0) == "#";
    },

    isValidContrast: function (color1, color2) {
        var ccc = new ColorContrastChecker();
        return ccc.isLevelAA(color1, color2);
    },

    getLine: function(code, attribute, startLine){
        var codeNewLine = code.substring(
            0,
            code.indexOf(attribute)
        ).match(/\n/g);

        return codeNewLine ? startLine + codeNewLine.length : startLine;
    }
};