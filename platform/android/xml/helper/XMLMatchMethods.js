var XMLHelper = require('./XMLHelper.js');
var XMLConstants = require('./XMLConstants.js');

module.exports = {
    matchAndroidLayoutSize: function(code, minWidth, minHeigth, recommendedUnit) {
        var width = XMLHelper.getParameterValue(XMLConstants.PARAMETERS.LAYOUT_WIDTH);
        var height = XMLHelper.getParameterValue(XMLConstants.PARAMETERS.LAYOUT_HEIGHT);


        if(!width || !height){
            return {err: "Sintax error"}; //No tiene width ni heigth
        }

        var numericWidthValue = XMLHelper.getNumericValueFromParameter(width);
        var numericHeightValue = XMLHelper.getNumericValueFromParameter(height);

        var applyArray = [];

        if (numericWidthValue) {
            var widthUnit = XMLHelper.getUnitsValueFromParameter(width);
            if (widthUnit != recommendedUnit) {
                //send Error Unit dp y que el minimo recomendado es 48
                applyArray.push({
                    type: "No"+name+"Dp",
                    size: resultValue[0],
                    unit: resultUnit
                });
            }
            else {
                if (parseInt(numericWidthValue) < minWidth) {
                    //send min error
                    applyArray.push({
                        type: name+"Size",
                        quote: code[position+1],
                        size: resultValue[0]
                    });
                }
            }
        }

        if (numericHeightValue) {
            var heightUnit = XMLHelper.getUnitsValueFromParameter(height);
            if (heightUnit != recommendedUnit) {
                //send Error Unit dp y que el minimo recomendado es 48
            }
            else {
                if (parseInt(numericHeightValue) < minHeigth) {
                    //send min error
                }
            }
        }

        return _.isEmpty(applyArray) ? false : applyArray;
    }
}