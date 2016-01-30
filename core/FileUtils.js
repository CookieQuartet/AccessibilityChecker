module.exports = {

  applyAccessibilityCheckerChanges: function (code, accessibilityCheckerArray) {

    _.each(accessibilityCheckerArray, function(accessibilityCheckerItem) {
      code = this.replaceCodeNode(code, accessibilityCheckerItem.code, accessibilityCheckerItem.startIndex, accessibilityCheckerItem.endIndex)
    });

    return code;
  },

  /*
        - code es el viejo codigo completo
        - node es la porcion que de codigo que hay que reemplazar
   */
  replaceCodeNode: function(code, node, startIndex, endIndex) {

    //TODO VER COMO HACER ESTO SIN QUE SE PISEN LOS NODOS.

    return code;
  }

}