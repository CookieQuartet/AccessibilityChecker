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
            return false;//{err: "Sintax error"}; //No tiene width ni heigth
        }

        var numericWidthValue = XMLHelper.getNumericValueFromParameter(width);
        var numericHeightValue = XMLHelper.getNumericValueFromParameter(height);

        var result = [];
        var analyzeSize =  function(parameter, numericValue, minSize, sizeErrorText, constant){
            var analyzeResult = [];
            if (numericValue) {
                var unit = XMLHelper.getUnitValueFromParameter(parameter);
                if (unit != recommendedUnit) {
                    code = XMLHelper.replaceUnitParameterValue(codeBlock.code, parameter, recommendedUnit, constant);
                    result.push(Common.resultItem(codeBlock, code, "La unidad recomendada es " + recommendedUnit, XMLHelper.getLine(code, constant, codeBlock.startLine), true));
                }
                else {
                    if (parseInt(numericValue) < minSize) {
                        code = XMLHelper.replaceNumericParameterValue(codeBlock.code, parameter, minSize, constant);
                        result.push(Common.resultItem(codeBlock, code, sizeErrorText+minSize+recommendedUnit, XMLHelper.getLine(code, constant, codeBlock.startLine)));
                    }
                }
            }

            return analyzeResult;
        };

        if(numericWidthValue){
            var widthResult = analyzeSize(width, numericWidthValue, minWidth, "El ancho mínimo recomendado es ", XMLConstants.PARAMETERS.LAYOUT_WIDTH);
            result = _.union(result, widthResult);
        }

        if(numericHeightValue){
            var heightResult = analyzeSize( height, numericHeightValue, minHeigth, "La altura mínima recomendada es ", XMLConstants.PARAMETERS.LAYOUT_HEIGHT);
            result = _.union(result, heightResult);

        }

        return result;
    },

    analyzeTextSize: function(codeBlock, minSize, recommendedUnit) {
        var code = codeBlock.code;

        var textSize = XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT_SIZE);

        if(!textSize){
            return false; //No tiene text size
        }

        var result = [];

        var textSizeUnit = XMLHelper.getUnitValueFromParameter(textSize);

        if (textSizeUnit != recommendedUnit) {
            code = XMLHelper.replaceUnitParameterValue(codeBlock.code, textSize, recommendedUnit, XMLConstants.PARAMETERS.TEXT_SIZE);
            result.push(Common.resultItem(codeBlock, code, "La unidad recomendada es " + recommendedUnit, XMLHelper.getLine(code, XMLConstants.PARAMETERS.TEXT_SIZE, codeBlock.startLine), true));
        }
        else
        {
            var textSizeValue = XMLHelper.getNumericValueFromParameter(textSize);

            if (parseInt(textSizeValue) < minSize) {
                code = XMLHelper.replaceNumericParameterValue(codeBlock.code, textSize, minSize, XMLConstants.PARAMETERS.TEXT_SIZE);
                result.push(Common.resultItem(codeBlock, code, "El tamaño de texto mínimo recomendado es " + minSize, XMLHelper.getLine(code, XMLConstants.PARAMETERS.TEXT_SIZE, codeBlock.startLine)));
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
            result.push(Common.resultItem(codeBlock, code, "Atributo hint ausente", XMLHelper.getLine(code, XMLConstants.PARAMETERS.HINT, codeBlock.startLine)));
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
                result.push(Common.resultItem(codeBlock, "", "Se recomienda que el valor del text se encuentre definido en el archivo res/values/strings.xml", XMLHelper.getLine(codeBlock.code, XMLConstants.PARAMETERS.TEXT, codeBlock.startLine), true));
            }
        }

        if(hint) {
            if (hint.indexOf(XMLConstants.RES.STRING) == -1) {
                result.push(Common.resultItem(codeBlock, "", "Se recomienda que el valor del hint se encuentre definido en el archivo res/values/strings.xml", XMLHelper.getLine(codeBlock.code, XMLConstants.PARAMETERS.HINT, codeBlock.startLine), true));
            }
        }

        return result;
    },

    analyzeContrast: function(codeBlock) {
        function formatColor(color) {
            var result = '';
            switch(true) {
                case (typeof color == 'string' && (color.replace('#', '')).length == 8):
                    // quitar el canal alpha del color
                    result = '#' + color.slice(3);
                    break;
                case (typeof color == 'string' && (color.replace('#', '')).length == 3):
                    // convertir a 6-digit
                    result = color[0] + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
                    break;
                default:
                    result = color;
            }
            return result;
            //return (typeof color == 'string' && (color.replace('#', '')).length == 8) ? '#' + color.slice(3) : color;
        }
        var code = codeBlock.code;
        var background = formatColor(XMLHelper.getParameter(code, XMLConstants.PARAMETERS.BACKGROUND));
        var textColor = formatColor(XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT_COLOR));
        var hintColor = formatColor(XMLHelper.getParameter(code, XMLConstants.PARAMETERS.HINT_COLOR));
        var result = [];
        //var _helper = '';
        //var textColor = '', hintColor;

        if (background && XMLHelper.isHexColor(background)) {
            //_helper = formatColor(XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT_COLOR));
            //textColor = formatColor(XMLHelper.getParameter(code, XMLConstants.PARAMETERS.TEXT_COLOR));
            if (textColor && XMLHelper.isHexColor(textColor) && !XMLHelper.isValidContrast(background, textColor)) {
                result.push(Common.resultItem(codeBlock, "", "El color del texto no hace buen contraste con el color del fondo", codeBlock.startLine, true));
            }

            //hintColor = formatColor(XMLHelper.getParameter(code, XMLConstants.PARAMETERS.HINT_COLOR));
            if (hintColor && XMLHelper.isHexColor(hintColor) && !XMLHelper.isValidContrast(background, hintColor)) {
                result.push(Common.resultItem(codeBlock, "", "El color del hint no hace buen contraste con el color del fondo", codeBlock.startLine, true));
            }
        }

        return result;
    }
};