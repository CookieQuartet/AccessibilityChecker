var _ = require('lodash');
var XMLConstants = require('./XMLConstants.js');

module.exports = {

    //Retorna el valor del primer parametro encontrado
    getParameterValue: function (code, parameter) {

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

    getUnitsValueFromParameter: function (parameter) {
        if (this.getNumericValueFromParameter(parameter) != null){
            var unit = parameter.slice(parameter.length-2, parameter.length);
            if (_.has(_.invert(XMLConstants.UNITS), unit)) {
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

    replaceParameterValue: function (code, parameter, value) {

        var quote = code

        var parameterIndexOf = code.indexOf(parameter);

        if(parameterIndexOf  == -1 ) {
            return {match:false, err: "Sintax error"}; //Parametro no encontrado
        }

        return code.replace(parameter+applyObject.quote+applyObject.size, value);
    },

    getIndexOfParameter: function (code, parameter) {
        return code.indexOf(parameter);
    },



}