var XMLRuleActions = require('./helper/XMLRuleActions.js');
var XMLConstants = require('./helper/XMLConstants.js');
var XMLHelper = require('./helper/XMLHelper.js');

var XMLCodeRules = [
    {
        id: 1,
        priority: 1,
        name: 'Regla tamaño de button',
        description: 'Prueba del tamaño del button sea superior',
        type: 'android.xml.tag',
        action: function(codeBlock) {
            if (!XMLHelper.verifyFirstElement(codeBlock.code, XMLConstants.TAGS.BUTTON) && !XMLHelper.verifyFirstElement(codeBlock.code, XMLConstants.TAGS.IMAGE_BUTTON)) {
                return false;
            }

            return XMLRuleActions.analyzeAndroidLayoutSize(codeBlock, 48, 48, XMLConstants.UNITS.DP);
        }
    }
];

module.exports = XMLCodeRules;