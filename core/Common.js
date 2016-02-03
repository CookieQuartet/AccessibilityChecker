module.exports = {

  resultItem : function (codeBlock, code, error, onlyHint) {
    return {
      originalCode: codeBlock.code,
      code: code,
      startIndex: codeBlock.startIndex,
      endIndex: codeBlock.endIndex,
      startLine: codeBlock.startLine,
      stopLine: codeBlock.stopLine,
      error: error,
      onlyHint: onlyHint == 'undefined'  ? false : onlyHint
    }
  },

}