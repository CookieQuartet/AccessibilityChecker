var _ = require('lodash');
var XMLConstants = require('./XMLConstants.js');

var CCC = require('color-contrast-checker');

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

        var i, len;

        for (i = 0, len = elements.length() ; i < len; i++)
        {
            if (this.verifyFirstElementOnElement(code, elements[i]))
            {
                return true;
            }
        }
        return false;
    },

    replaceParameterValue: function (code, parameter, value) {

        //TODO REVISAR ESTO

        var quote = code

        var parameterIndexOf = code.indexOf(parameter);

        if(parameterIndexOf  == -1 ) {
            return {match:false, err: "Sintax error"}; //Parametro no encontrado
        }

        return code.replace(parameter+applyObject.quote+applyObject.size, value);
    },

    replaceNumericParameterValue: function (code, parameter, numericValue, attribute) {
        return code.replace(
            code.substring(
                code.indexOf(attribute),
                code.length
            ).match(parameter)[0].match(/\d+/),
            numericValue
        );
    },

    replaceUnitParameterValue: function (code, parameter, unit, attribute) {
        return code.replace(
            code.substring(
                code.indexOf(attribute),
                code.length
            ).match(parameter)[0].match((/[A-z]\w+/g)),
            unit
        );
    },

    getIndexOfParameter: function (code, parameter) {
        return code.indexOf(parameter);
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
    },
}