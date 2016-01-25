var XMLMatchMethods = require('./helper/XMLMatchMethods.js');
var XMLApplyMethods = require('./helper/XMLApplyMethods.js');
var XMLConstants = require('./helper/XMLConstants.js');
var XMLHelper = require('./helper/XMLHelper.js');

var XMLCodeRules = [
    {
        id: 1,
        priority: 1,
        name: 'Regla tamaño de button',
        description: 'Prueba del tamaño del button sea superior',
        type: 'android.xml.tag',
        match: function(code, mode) {

            if (!XMLHelper.verifyFirstElement(code, XMLConstants.TAGS.BUTTON)) {
                return false;
            }

            return XMLMatchMethods.matchAndroidLayoutSize(code, 48, 48, XMLConstants.UNITS.DP);

        },
        apply: function(code, applyArray) {
            for(var i=0; i<applyArray.length; i++){
                code = XMLApplyMethods.applyAndroidLayoutSize[applyArray[i].type](code, applyArray[i]);
            }
            return code;
        }
    }
];

module.exports = XMLCodeRules;