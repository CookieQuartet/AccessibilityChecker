var XMLHelper = require('./XMLHelper.js');
var XMLConstants = require('./XMLConstants.js');
var constants = require('../../../../constants.js');

var _ = require('lodash');

module.exports = {
    analyzeAndroidLayoutSize: function(code, line, minWidth, minHeigth, recommendedUnit, ruleId) {
        var width = XMLHelper.getParameterValue(code, XMLConstants.PARAMETERS.LAYOUT_WIDTH);
        var height = XMLHelper.getParameterValue(code, XMLConstants.PARAMETERS.LAYOUT_HEIGHT);


        if(!width || !height){
            return {err: "Sintax error"}; //No tiene width ni heigth
        }

        var numericWidthValue = XMLHelper.getNumericValueFromParameter(width);
        var numericHeightValue = XMLHelper.getNumericValueFromParameter(height);

        var analyzeResult = [];

        if (numericWidthValue) {
            var widthUnit = XMLHelper.getUnitsValueFromParameter(width);
            if (widthUnit != recommendedUnit) {
                if (mode == constants.MODE.ANALYZE) {
                    analyzeResult.push(this.resultItem(code, line, "La unidad recomendada es " + recommendedUnit, ruleId));
                }
            }
            else {
                if (parseInt(numericWidthValue) < minWidth) {
                    if (mode == constants.MODE.ANALYZE) {
                        analyzeResult.push(this.resultItem(code, line, "El ancho minimo recomendado es " + minWidth, ruleId));
                    }

                }
            }
        }

        if (numericHeightValue) {
            var heightUnit = XMLHelper.getUnitsValueFromParameter(height);
            if (heightUnit != recommendedUnit) {
                analyzeResult.push(this.resultItem(code, line, "La unidad recomendada es " + recommendedUnit, ruleId));
            }
            else {
                if (parseInt(numericHeightValue) < minHeigth) {
                    if (mode == constants.MODE.ANALYZE){
                        analyzeResult.push(this.resultItem(code, line, "La altura minima recomendada es " + minHeigth, ruleId));
                    }
                }
            }
        }

        return {
            code: code,
            analyzeResult: analyzeResult
        }
    },

    resultItem : function (code, line, error, id) {

        return {
            code: code,
            line: line,
            error: error,
            ruleId: id
        }
    }

}