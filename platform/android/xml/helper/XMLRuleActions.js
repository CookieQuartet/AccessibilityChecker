var XMLHelper = require('./XMLHelper.js');
var XMLConstants = require('./XMLConstants.js');
var Common = require('../../../../core/Common.js');

var _ = require('lodash');

module.exports = {
    analyzeAndroidLayoutSize: function(codeBlock, minWidth, minHeigth, recommendedUnit) {
        var code = codeBlock.code;

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
                code = XMLHelper.replaceUnitParameterValue(codeBlock.code, width, recommendedUnit, XMLConstants.PARAMETERS.LAYOUT_WIDTH);
                result.push(Common.resultItem(codeBlock, code, "La unidad recomendada es " + recommendedUnit));
            }
            else {
                if (parseInt(numericWidthValue) < minWidth) {
                    code = XMLHelper.replaceNumericParameterValue(codeBlock.code, width, minWidth, XMLConstants.PARAMETERS.LAYOUT_WIDTH);
                    result.push(Common.resultItem(codeBlock, code, "El ancho minimo recomendado es " + minWidth));
                }
            }
        }

        if (numericHeightValue) {
            var heightUnit = XMLHelper.getUnitValueFromParameter(height);
            if (heightUnit != recommendedUnit) {
                code = XMLHelper.replaceUnitParameterValue(codeBlock.code, height, recommendedUnit, XMLConstants.PARAMETERS.LAYOUT_HEIGHT);
                result.push(Common.resultItem(codeBlock, code, "La unidad recomendada es " + recommendedUnit));
            }
            else {
                if (parseInt(numericHeightValue) < minHeigth) {
                    code = XMLHelper.replaceNumericParameterValue(codeBlock.code, height, minHeigth, XMLConstants.PARAMETERS.LAYOUT_HEIGHT);
                    result.push(Common.resultItem(codeBlock, code, "La altura minima recomendada es " + minHeigth));
                }
            }
        }

        return result;
    }
}