module.exports = {
    matchAndroidLayoutSize: function(code){
        var _code = code.replace(" ", "");

        var widthString = "android:layout_width";
        var heigthString = "android:layout_height";
        var widthPosition = _code.indexOf(widthString)+widthString.length; //Obtengo la posicion desde donde se define el width
        var heigthPosition = _code.indexOf(heigthString)+heigthString.length; //Obtengo la posicion desde donde se define el heigth

        if(widthPosition-widthString.length == -1 || heigthPosition-heigthString.length == -1){
            return {match:false, err: "Sintax error"}; //No tiene width ni heigth
        }

        var resultWidth = getSizeValue(widthPosition, _code, _code[widthPosition+1]);
        var resultHeight = getSizeValue(heigthPosition, _code, _code[heigthPosition+1]);

        var matchObject = {
            match:false,
            applyArray:[]
        };
        matchObject = matchLayoutSize(resultWidth, "Width", widthPosition, _code,  matchObject);
        matchObject  = matchLayoutSize(resultHeight, "Height", heigthPosition, _code, matchObject);

        if(!matchObject.match)
            delete matchObject.applyArray;
        return matchObject;
    }
}

function getSizeValue(position, code, quote){
    var re = new RegExp(quote+"[^"+quote+"]+"+quote);
    return code.slice(position, code.length).match(re);
}

function matchLayoutSize(resultSize, name, position, code, matchObject){
    var resultValue = resultSize[0].slice(1, resultSize[0].length-1);
    resultValue = resultSize[0].match(/\d+/); //Obtengo valores numericos
    if(resultValue){
        var resultUnit = resultSize[0].slice(1, resultSize[0].length-1).split(resultValue[0])[1];
        if(resultUnit!="dp"){
            matchObject.match = true;
            matchObject.applyArray.push({
                type: "No"+name+"Dp",
                size: resultValue[0],
                unit: resultUnit
            });
        }
        if(resultValue[0] < 48){
            matchObject.match = true;
            matchObject.applyArray.push({
                type: name+"Size",
                quote: code[position+1],
                size: resultValue[0]
            });
        }
    }
    return matchObject
}