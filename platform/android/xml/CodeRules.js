var XMLRuleActions = require('./helper/XMLRuleActions.js');
var XMLConstants = require('./helper/XMLConstants.js');
var XMLHelper = require('./helper/XMLHelper.js');

var XMLCodeRules = [
    {
        id: 1,
        priority: 1,
        name: 'Tamaño de área clickeable',
        description: 'Se verifica que el tamaño del elemento sea mayor o igual a 48 DP',
        type: 'android.xml.tag',
        action: function(codeBlock) {
            if (!XMLHelper.verifyFirstElementOnElements(codeBlock.code, [XMLConstants.TAGS.BUTTON, XMLConstants.TAGS.IMAGE_BUTTON, XMLConstants.TAGS.CHECK_BOX, XMLConstants.TAGS.SWITCH])) {
                return false;
            }

            return XMLRuleActions.analyzeAndroidLayoutSize(codeBlock, 48, 48, XMLConstants.UNITS.DP);
        }
    },
    {
        id: 2,
        priority: 1,
        name: 'Tamaño de texto',
        description: 'Se verifica que el tamaño de texto del elemento sea mayor o igual a 12 SP',
        type: 'android.xml.tag',
        action: function(codeBlock) {
            if (!XMLHelper.verifyFirstElementOnElements(codeBlock.code, [XMLConstants.TAGS.TEXT_VIEW, XMLConstants.TAGS.EDIT_TEXT, XMLConstants.TAGS.BUTTON, XMLConstants.TAGS.CHECK_BOX, XMLConstants.TAGS.SWITCH])) {
                return false;
            }

            return XMLRuleActions.analyzeTextSize(codeBlock, 12, XMLConstants.UNITS.SP);
        }
    },
    {
        id: 3,
        priority: 2,
        name: 'Hint recomendado',
        description: 'Se verifica que el elemento tenga el atributo hint seteado',
        type: 'android.xml.tag',
        action: function(codeBlock) {
            if (!XMLHelper.verifyFirstElement(codeBlock.code, XMLConstants.TAGS.EDIT_TEXT)) {
                return false;
            }

            return XMLRuleActions.checkHint(codeBlock);
        }
    },

    {
        id: 4,
        priority: 2,
        name: 'Strings en resources',
        description: 'Se verifica que no existan strings hardcodeados',
        type: 'android.xml.tag',
        action: function(codeBlock) {
            if (!XMLHelper.verifyFirstElementOnElements(codeBlock.code, [XMLConstants.TAGS.TEXT_VIEW, XMLConstants.TAGS.EDIT_TEXT, XMLConstants.TAGS.BUTTON, XMLConstants.TAGS.CHECK_BOX, XMLConstants.TAGS.SWITCH])) {
                return false;
            }

            return XMLRuleActions.checkHardcodedStrings(codeBlock);
        }
    },

    {
        id: 5,
        priority: 1,
        name: 'Contraste de los textos con el fondo',
        description: 'Se verifica que no los colores del fondo y los textos no sean similares',
        type: 'android.xml.tag',
        action: function(codeBlock) {
            if (!XMLHelper.verifyFirstElementOnElements(codeBlock.code, [XMLConstants.TAGS.TEXT_VIEW, XMLConstants.TAGS.EDIT_TEXT, XMLConstants.TAGS.BUTTON, XMLConstants.TAGS.CHECK_BOX, XMLConstants.TAGS.SWITCH])) {
                return false;
            }

            return XMLRuleActions.analyzeContrast(codeBlock);
        }
    }

];

module.exports = XMLCodeRules;