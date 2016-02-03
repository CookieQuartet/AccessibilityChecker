var _ = require('lodash');
var XMLConstants = require('./XMLConstants.js');

var CCC = require('color-contrast-checker/src/colorContrastChecker');

module.exports = {

    //Retorna el valor del primer parametro encontrado
    getParameter: function (code, parameter) {

        var parameterIndexOf = code.indexOf(parameter);

        if(parameterIndexOf  == -1 ) {
            return false; //Parametro no encontrado
        }

        var value = code.slice(parameterIndexOf, code.length).match(new RegExp("\"[^\"]+\"|\'[^\']+\'"))[0];

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

    getValueFromParameter: function (parameter) {
        parameter = this.removeSpaces(parameter);

        var i = code.indexOf("=");

        return parameter.substr(i + 1, parameter.length - 2);
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
        var splittedCode = this.splitText(code, parameter, attribute);
        return splittedCode[0] + splittedCode[1].replace(splittedCode[1].match(parameter)[0].match(/\d+/), numericValue) + splittedCode[2];
    },

    replaceUnitParameterValue: function (code, parameter, unit, attribute) {
        var splittedCode = this.splitText(code, parameter, attribute);
        return splittedCode[0] + splittedCode[1].replace(splittedCode[1].match(parameter)[0].match((/[A-z]\w+/g)), unit) + splittedCode[2];
    },

    splitText: function(code, parameter, attribute){
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
        var i = code.indexOf(" "); //TODO: ES VALIDO ESTO ?
        return code.slice(0, i) + parameter + code.slice(i)
    },

    makeParameter: function (parameterKey, parameterValue) {
        return parameterKey + "=\"" + parameterValue + "\"";
    },

    isHexColor: function (color) {
        return color.charAt(0) == "#";
    },

    isValidContrast: function (color1, color2) {
        return new CCC.ColorContrastChecker().isLevelAA(color1, color2, 14);
    }
}