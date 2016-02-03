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
            onlyHint: onlyHint == 'undefined'  ? false : onlyHint //TODO: Es necesario el == 'undefined' ? Porque lo que enviamos es un booleano o nada, y seria mejor onlyHint ? true : false
        }
    }
};