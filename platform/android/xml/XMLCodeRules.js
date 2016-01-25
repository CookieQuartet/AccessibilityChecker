var XMLMatchMethods = require('./helper/XMLRuleActions.js');
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
        action: function(code, line) {
            if (!XMLHelper.verifyFirstElement(code, XMLConstants.TAGS.BUTTON)) {
                return false;
            }

            return XMLMatchMethods.analyzeAndroidLayoutSize(code, line, 48, 48, XMLConstants.UNITS.DP, this.id);
        }
    }
];

module.exports = XMLCodeRules;