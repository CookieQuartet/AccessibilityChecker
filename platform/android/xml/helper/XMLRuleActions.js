var XMLHelper = require('./XMLHelper.js');
var XMLConstants = require('./XMLConstants.js');

var _ = require('lodash');

module.exports = {
    analyzeAndroidLayoutSize: function(code, line, minWidth, minHeigth, recommendedUnit) {
        var originalCode = code;

        var width = XMLHelper.getParameterValue(code, XMLConstants.PARAMETERS.LAYOUT_WIDTH);
        var height = XMLHelper.getParameterValue(code, XMLConstants.PARAMETERS.LAYOUT_HEIGHT);


        if(!width || !height){
            return {err: "Sintax error"}; //No tiene width ni heigth
        }

        var numericWidthValue = XMLHelper.getNumericValueFromParameter(width);
        var numericHeightValue = XMLHelper.getNumericValueFromParameter(height);

        var result = [];

        if (numericWidthValue) {
            var widthUnit = XMLHelper.getUnitValueFromParameter(width);
            if (widthUnit != recommendedUnit) {
                code = XMLHelper.replaceUnitParameterValue(code, width, recommendedUnit);
                analyzeResult.push(this.resultItem(originalCode, code, line, "La unidad recomendada es " + recommendedUnit));
            }
            else {
                if (parseInt(numericWidthValue) < minWidth) {
                    code = XMLHelper.replaceNumericParameterValue(code, width, minWidth);
                    analyzeResult.push(this.resultItem(originalCode, code, line, "El ancho minimo recomendado es " + minWidth));
                }
            }
        }

        if (numericHeightValue) {
            var heightUnit = XMLHelper.getUnitValueFromParameter(height);
            if (heightUnit != recommendedUnit) {
                code = XMLHelper.replaceUnitParameterValue(code, height, recommendedUnit);
                analyzeResult.push(this.resultItem(originalCode, code, line, "La unidad recomendada es " + recommendedUnit));
            }
            else {
                if (parseInt(numericHeightValue) < minHeigth) {
                    code = XMLHelper.replaceNumericParameterValue(code, height, minHeigth);
                    analyzeResult.push(this.resultItem(originalCode, code, line, "La altura minima recomendada es " + minHeigth));
                }
            }
        }

        return result;
    },

    resultItem : function (originalCode, code, line, error) {

        return {
            originalCode: originalCode,
            code: code,
            line: line,
            error: error
        }
    }

}