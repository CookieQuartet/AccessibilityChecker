var XMLHelper = require('./XMLHelper.js');
var XMLConstants = require('./XMLConstants.js');
var _ = require('lodash');

module.exports = {
    matchAndroidLayoutSize: function(code, minWidth, minHeigth, recommendedUnit) {
        var width = XMLHelper.getParameterValue(code, XMLConstants.PARAMETERS.LAYOUT_WIDTH);
        var height = XMLHelper.getParameterValue(code, XMLConstants.PARAMETERS.LAYOUT_HEIGHT);


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
                console.log("WIDTH UNIDADES: UNIDAD ACTUAL: "+widthUnit+" - UNIDAD RECOMENDADA: "+recommendedUnit)
                //applyArray.push({
                //    type: "No"+name+"Dp",
                //    size: resultValue[0],
                //    unit: resultUnit
                //});
            }
            else {
                if (parseInt(numericWidthValue) < minWidth) {
                    console.log("WIDTH VALUE: VALOR ACTUAL: "+parseInt(numericWidthValue)+" - VALOR RECOMENDADO: "+minWidth)
                    //send min error
                    //applyArray.push({
                    //    type: name+"Size",
                    //    quote: code[position+1],
                    //    size: resultValue[0]
                    //});
                }
            }
        }

        if (numericHeightValue) {
            var heightUnit = XMLHelper.getUnitsValueFromParameter(height);
            if (heightUnit != recommendedUnit) {
                console.log("HEIGHT UNIDADES: UNIDAD ACTUAL: "+heightUnit+" - UNIDAD RECOMENDADA: "+recommendedUnit)
                //send Error Unit dp y que el minimo recomendado es 48
            }
            else {
                if (parseInt(numericHeightValue) < minHeigth) {
                    console.log("WIDTH VALUE: VALOR ACTUAL: "+parseInt(numericHeightValue)+" - VALOR RECOMENDADO: "+minHeigth)
                    //send min error
                }
            }
        }

        return _.isEmpty(applyArray) ? false : applyArray;
    }
}