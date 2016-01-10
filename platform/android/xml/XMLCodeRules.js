var XMLMatchMethods = require('./helper/XMLMatchMethods.js');
var XMLApplyMethods = require('./helper/XMLApplyMethods.js');

var XMLCodeRules = [
    {
        id: 1,
        priority: 1,
        name: 'Regla tamaño de button',
        description: 'Prueba del tamaño del button sea superior',
        type: 'android.xml.tag',
        match: function(code) {
            var regexButton = /^<Button/;
            var _code = code.replace(" ", "");
            if(!code.match(regexButton)){
                return false;
            }

            return XMLMatchMethods.matchAndroidLayoutSize(code);
        },
        apply: function(code, applyArray) {
            var that = this;
            that.code = code;
            for(var i=0; i<applyArray.length; i++){
                that.code = XMLApplyMethods.applyAndroidLayoutSize[applyArray[i].type](that.code, applyArray[i]);
            }
            return that.code;
        }
    }
];

module.exports = XMLCodeRules;