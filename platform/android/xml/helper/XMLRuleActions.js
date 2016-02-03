var XMLHelper = require('./XMLHelper.js');
var XMLConstants = require('./XMLConstants.js');
var Common = require('../../../../core/Common.js');

var _ = require('lodash');

module.exports = {
    analyzeAndroidLayoutSize: function(codeBlock, minWidth, minHeigth, recommendedUnit) {
        var code = codeBlock.code;

        var width = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.LAYOUT_WIDTH);
        var height = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.LAYOUT_HEIGHT);


        if(!width || !height){
            return {err: "Sintax error"}; //No tiene width ni heigth
        }

        var numericWidthValue = XMLHelper.getNumericValueFromParameter(width);
        var numericHeightValue = XMLHelper.getNumericValueFromParameter(height);

        var result = [];
        var analyzeSize =  function(parameter, numericValue, minSize, sizeErrorText){
            var analyzeResult = [];
            if (numericValue) {
                var unit = XMLHelper.getUnitValueFromParameter(parameter);
                if (unit != recommendedUnit) {
                    code = XMLHelper.replaceUnitParameterValue(codeBlock.code, parameter, recommendedUnit, sizeErrorText);
                    result.push(Common.resultItem(codeBlock, code, "La unidad recomendada es " + recommendedUnit));
                }
                else {
                    if (parseInt(numericValue) < minSize) {
                        code = XMLHelper.replaceNumericParameterValue(codeBlock.code, parameter, minSize, sizeErrorText);
                        result.push(Common.resultItem(codeBlock, code, sizeErrorText));
                    }
                }
            }

            return analyzeResult;
        };

        if(numericWidthValue){
            var widthResult = analyzeSize(width, numericWidthValue, minWidth, "El ancho mínimo recomendado es " + XMLConstants.PARAMETERS.LAYOUT_WIDTH);
            result = _.union(result, widthResult);
        }

        if(numericHeightValue){
            var heightResult = analyzeSize( height, numericHeightValue, minHeigth, "La altura mínima recomendada es " + XMLConstants.PARAMETERS.LAYOUT_HEIGHT);
            result = _.union(result, heightResult);

        }

        return result;
    },

    analyzeTextSize: function(codeBlock, minSize, recommendedUnit) {
        var code = codeBlock.code;

        var textSize = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT_SIZE);

        if(!textSize){
            return {err: "Sintax error"}; //No tiene text size
        }

        var result = [];

        var textSizeUnit = XMLHelper.getUnitValueFromParameter(textSize);

        if (textSizeUnit != recommendedUnit) {
            code = XMLHelper.replaceUnitParameterValue(codeBlock.code, textSize, recommendedUnit, XMLConstants.PARAMETERS.TEXT_SIZE);
            result.push(Common.resultItem(codeBlock, code, "La unidad recomendada es " + recommendedUnit));
        }
        else
        {
            var textSizeValue = XMLHelper.getNumericValueFromParameter(textSize);

            if (parseInt(textSizeValue) < minSize) {
                code = XMLHelper.replaceNumericParameterValue(codeBlock.code, textSize, minSize, XMLConstants.PARAMETERS.TEXT_SIZE); //TODO: En el ejemplo inserta sobre android:layout_width
                result.push(Common.resultItem(codeBlock, code, "El tamaño de texto mínimo recomendado es " + minSize));
            }
        }

        return result;
    },

    checkHint: function(codeBlock) {
        var code = codeBlock.code;

        var hint = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.HINT);

        var result = [];

        if(!hint) {
            code = XMLHelper.addParameter(codeBlock.code, XMLHelper.makeParameter(XMLConstants.PARAMETERS.HINT , ""));
            result.push(Common.resultItem(codeBlock, code, "Atributo hint ausente"));
        }

        return result;
    },

    checkHardcodedStrings: function(codeBlock) {
        var code = codeBlock.code;

        var text = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT);
        var hint = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.HINT);

        var result = [];

        if(text) {
            if (text.indexOf(XMLConstants.RES.STRING) == -1) {
                result.push(Common.resultItem(codeBlock, "", "Se recomienda que el valor del text se encuentre definido en el archivo res/values/strings.xml", true));
            }
        }

        if(hint) {
            if (hint.indexOf(XMLConstants.RES.STRING) == -1) {
                result.push(Common.resultItem(codeBlock, "", "Se recomienda que el valor del hint se encuentre definido en el archivo res/values/strings.xml", true));
            }
        }

        return result;
    },

    analyzeContrast: function(codeBlock) {
        var code = codeBlock.code;

        var background = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.BACKGROUND);

        var result = [];

        if (background) {
            var backgroundValue = XMLHelper.getValueFromParameter(background);

            if (XMLHelper.isHexColor(backgroundValue)) {
                var textColor = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT_COLOR);

                if (textColor) {
                    var textColorValue = XMLHelper.getValueFromParameter(textColor);

                    if (XMLHelper.isHexColor(textColorValue)) {
                        if (!XMLHelper.isValidContrast(backgroundValue, textColorValue)) {
                            result.push(Common.resultItem(codeBlock, "", "El color del texto no hace buen contraste con el color del fondo", true));
                        }
                    }
                }

                var hintColor = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.HINT_COLOR);

                if (hintColor) {
                    var hintColorValue = XMLHelper.getValueFromParameter(hintColor);

                    if (XMLHelper.isHexColor(hintColorValue)) {
                        if (!XMLHelper.isValidContrast(backgroundValue, hintColorValue)) {
                            result.push(Common.resultItem(codeBlock, "", "El color del hint no hace buen contraste con el color del fondo", true));
                        }
                    }
                }
            }
        }

        return result;
    }
}