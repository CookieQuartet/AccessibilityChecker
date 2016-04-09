module.exports = {
    resultItem : function (codeBlock, code, error, specificLine, onlyHint) {
        return {
            originalCode: codeBlock.code,
            code: code,
            startIndex: codeBlock.startIndex,
            endIndex: codeBlock.endIndex,
            startLine: codeBlock.startLine,
            stopLine: codeBlock.stopLine,
            error: error,
            onlyHint: onlyHint  ? onlyHint: false,
            specificLine: specificLine ? specificLine : codeBlock.startLine
        }
    }
};