module.exports = {
    matchAndroidLayoutSize: function(code){
        var _code = code.replace(" ", "");

        var widthString = "android:layout_width";
        var heigthString = "android:layout_height";
        var widthPosition = _code.indexOf(widthString); //Obtengo la posicion desde donde se define el width
        var heigthPosition = _code.indexOf(heigthString); //Obtengo la posicion desde donde se define el heigth
        var valueRegexSingleQuote = /'[^']+'/;
        var valueRegexDoubleQuote = /"[^"]+"/;

        if(widthPosition == -1 || heigthPosition == -1){
            return {match:false, err: "Sintax error"}; //No tiene width ni heigth
        }

        widthPosition+=widthString.length;
        heigthPosition+=heigthString.length;

        var resultWidth;
        var resultHeight;
        var widthQuote = _code[widthPosition+1];
        var heightQuote = _code[heigthPosition+1];



        //Obtengo los valores del width
        switch(widthQuote){ //Ver de usar el width quote para simplificar esto en una linea
            case '\'':
                resultWidth = _code.slice(widthPosition, _code.length).match(valueRegexSingleQuote);
                break;
            case '\"':
                resultWidth = _code.slice(widthPosition, _code.length).match(valueRegexDoubleQuote);
                break;
            default:
                return {match:false, err: "Sintax error"};
        }

        //Obtengo los valores del heigth
        switch(heightQuote){ //Ver de usar el heigth quote para simplificar esto en una linea
            case '\'':
                resultHeight = _code.slice(heigthPosition, _code.length).match(valueRegexSingleQuote);
                break;
            case '\"':
                resultHeight = _code.slice(heigthPosition, _code.length).match(valueRegexDoubleQuote);
                break;
            default:
                return {match:false, err: "Sintax error"};
        }


        var matchObject = {
            match:false,
            applyArray:[]
        };

        //Analizo los valores del width
        var widthValue = resultWidth[0].slice(1, resultWidth[0].length-1);
        widthValue = resultWidth[0].match(/\d+/); //Obtengo valores numericos
        if(widthValue){
            var widthUnit = resultWidth[0].slice(1, resultWidth[0].length-1).split(widthValue[0])[1];
            if(widthUnit!="dp"){
                matchObject.match = true;
                matchObject.applyArray.push({
                    type: "noWidthDp",
                    size: widthValue[0],
                    unit: widthUnit
                });
            }
            if(widthValue[0] < 48){
                matchObject.match = true;
                matchObject.applyArray.push({
                    type: "widthSize",
                    quote: widthQuote,
                    size: widthValue[0]
                });
            }
        }

        //Analizo los valores del heigth
        var heightValue = resultHeight[0].slice(1, resultHeight[0].length-1);
        heightValue = resultHeight[0].match(/\d+/);
        if(heightValue){
            var heightUnit = resultHeight[0].slice(1, resultHeight[0].length-1).split(heightValue[0])[1];
            if(heightUnit!="dp"){
                matchObject.match = true;
                matchObject.applyArray.push({
                    type: "noHeightDp",
                    size: heightValue[0],
                    unit: heightUnit
                });
            }
            if(heightValue[0] < 48){
                matchObject.match = true;
                matchObject.applyArray.push({
                    type: "heightSize",
                    quote: heightQuote,
                    size: heightValue[0]
                });
            }
        }

        if(!matchObject.match)
            delete matchObject.applyArray;
        return matchObject;
    }
}