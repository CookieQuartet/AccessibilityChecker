var jsDiff2 = require('diff'); //TODO: VER POR QUE NO PUEDO USARLO SI LO DEFINO ACA Y NO EN LA FUNCION QUE LO LLAMA


module.exports = {
    mergeBlock: function(lastBlock, ACObj){
        var LBDifference = this.getDifference(lastBlock.originalCode, lastBlock.code),
            ACDifference = this.getDifference(ACObj.originalCode, ACObj.code),
            newCode = this.mergeItems(LBDifference, ACDifference, 0, 0, ""),
            originalCode = lastBlock.originalCode;
        lastBlock.code = newCode;

        return lastBlock;
    },
    mergeItems: function(LBDifference, ACDifference, indexLB, indexAC, codeResult){
        if(!LBDifference[0] && !ACDifference[0]){ //Termino de procesar
            return codeResult;
        }

        if(LBDifference.length <= 1 || ACDifference.length <= 1){ //Uno termino de procesar, puedo asignar con un bucle lo que falte
            var arrayDiff = LBDifference.length <= 1? ACDifference : LBDifference;
            var index = LBDifference.length <= 1 ? indexLB : indexAC;
            var diff = arrayDiff.shift();
            var auxText = diff.value.substring(index, diff.value.length);
            codeResult+=auxText;
            arrayDiff.forEach(function(diff){
                if(!diff.removed){
                    codeResult+=diff.value;
                }
            });
            return codeResult;
        }

        var LBText = LBDifference[0].value.substring(indexAC, LBDifference[0].value.length);
        var ACText = ACDifference[0].value.substring(indexLB, ACDifference[0].value.length);

        var aux = {};
        if(indexLB + ACText.length > indexAC + LBText.length){
            aux = this.processDiff(LBDifference, LBText, codeResult, indexLB);
            LBDifference = aux.arrayDiff;
            indexLB = aux.index;
        }
        else{
            aux = this.processDiff(ACDifference, ACText, codeResult, indexAC);
            ACDifference = aux.arrayDiff;
            indexAC = aux.index;
        }
        return this.mergeItems(LBDifference, ACDifference, indexLB, indexAC, aux.codeResult);
    },
    processDiff: function (arrayDiff, text, codeResult, index){
        if(!arrayDiff[0].removed && !arrayDiff[0].added){
            codeResult+= text;
            index+= text.length;
            arrayDiff.shift();
        }

        if(!arrayDiff[0]){ //No hay mas removed o added
            return {arrayDiff: arrayDiff, index:index, codeResult:codeResult};
        }

        index+= arrayDiff[0].value.length; //Suma al indice lo que habia en el original
        codeResult+= arrayDiff[1].value; //Agrega el nuevo texto
        arrayDiff.shift();
        arrayDiff.shift();

        return {arrayDiff: arrayDiff, index:index, codeResult:codeResult};
    },
    getDifference: function(fromCode, newCode){
        var jsDiff = require('diff'); //Ver por que no lo puedo requerir arriba
        return jsDiff.diffWords(fromCode, newCode);
    },
    sameBlock: function(blockObj, ACObj){
        return blockObj.start == ACObj.startLine && blockObj.stop == ACObj.stopLine;
    },
    setBlockItem: function(obj){
        return {
            originalCode: obj.originalCode,
            code: obj.code,
            start: obj.startLine,
            stop: obj.stopLine,
            children: []
        }
    },
    run: function(ACArray) {
        var that = this;
        var blockArray = [];
        var blockObj = {};
        ACArray.forEach(function (ACObj) {
            var lastBlock = blockArray[blockArray.length - 1];
            if (lastBlock && that.sameBlock(lastBlock, ACObj)) {
                blockArray[blockArray.length - 1] = that.mergeBlock(lastBlock, ACObj);
            }
            else {
                blockArray.push(that.setBlockItem(ACObj));

            }
        });
        console.log(blockArray[0].code);
        return blockArray
    }
}



//var prueba = [
//    {
//        "originalCode": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:layout_height=\"30px\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//        "code": "<Button\r\n                    android:layout_width=\"WIDTH NUEVO\"\r\n                    android:layout_height=\"30px\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//        "startIndex": 2491,
//        "startLine": 51,
//        "stopLine": 60,
//        "error": "El ancho minimo recomendado es 48"
//    },
//    {
//        "originalCode": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:layout_height=\"30px\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//        "code": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:layout_height=\"HEIGTH NUEVO\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//        "startIndex": 2491,
//        "startLine": 51,
//        "stopLine": 60,
//        "error": "El ancho minimo recomendado es 48"
//    },
//    {
//        "originalCode": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:layout_height=\"30px\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//        "code": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:CHAPUZA=\"ESTOESUNTEXTO_CHAPUCERO\"\r\n                    android:layout_height=\"30px\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//        "startIndex": 2491,
//        "startLine": 51,
//        "stopLine": 60,
//        "error": "El ancho minimo recomendado es 48"
//    //},
//    //{
//    //    "originalCode": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:layout_height=\"30px\"\r\n                    android:text=\"@string/composeButtonLabel\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//    //    "code": "<Button\r\n                    android:layout_width=\"30dp\"\r\n                    android:layout_height=\"30px\"\r\n                    android:NOESUN_TEXTO=\"@AAAAAAAA/COMPOSE BUTTON\"\r\n                    android:id=\"@+id/composeButton\"\r\n                    android:layout_below=\"@+id/buttonsLabel\"\r\n                    android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n                    android:nextFocusUp=\"@+id/buttonsLabel\"\r\n                    android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n                    />\r",
//    //    "startIndex": 2491,
//    //    "startLine": 51,
//    //    "stopLine": 60,
//    //    "error": "El ancho minimo recomendado es 48"
//    }
//]
//methods.run(prueba);
//Resultado esperado
//"<Button\r\n
//android:layout_width=\"WIDTH NUEVO\"\r\n
//android:CHAPUZA=\"ESTO ES UN TEXTO CHAPUCERO\"\r\n
//android:layout_height=\"HEIGTH NUEVO\"\r\n
//android:NO ES UN TEXTO=\"@string/COMPOSE BUTTON\"\r\n
//android:id=\"@+id/composeButton\"\r\n
//android:layout_below=\"@+id/buttonsLabel\"\r\n
//android:layout_alignLeft=\"@+id/buttonsLabel\"\r\n
//android:nextFocusUp=\"@+id/buttonsLabel\"\r\n
//android:nextFocusDown=\"@+id/checkboxesLabel\"\r\n
///>\r",