var _ = require('lodash');
var CodeRules = require('./CodeRules');

function BaseListener(rules, mode) {
  antlr4.tree.ParseTreeListener.call(this);
  this._blocks = [];
  this._index = 0;
  this.codeRules = new CodeRules(rules);
  return this;
}

var antlr4 = require('antlr4/index');

BaseListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);

BaseListener.prototype.constructor = BaseListener;

BaseListener.prototype.addBlock = function(block) {
  this._blocks.push({
    index: this._index++,
    code: block.code,
    originalCode: block.originalCode,
    start: block.start,
    stop: block.stop,
    children: []
  });
};

BaseListener.prototype.getBlocks = function() {
  return this._blocks;
};

BaseListener.prototype.clearBlocks = function() {
  this._blocks = [];
};

BaseListener.prototype.getCodeBlock = function(ctx) {
  var start = ctx.start.start,
      stop = ctx.stop.stop+ 1,
      code = ctx.start.getInputStream().getText(start, stop),
      startLine = ctx.start.line,
      stopLine = ctx.stop.line;
  return {
    start: start,
    stop: stop,
    code: code,
    originalCode: code,
    startLine: startLine,
    stopLine: stopLine
  }
};

BaseListener.prototype.processRule = function(code, line, rule) {
  return rule.action(code, line);
};

BaseListener.prototype.processCodeRules = function(codeBlock, rules) {
  var _self = this,
      _analyzeResult = [],
      _code = codeBlock.code;

  _.each(rules, function(rule) {
     var processResult = _self.processRule(_code,  codeBlock.startLine, rule);

    if (processResult) {
      _analyzeResult.push(processResult.analyzeResult);
      _code = processResult.code;
    }

  });

  return {
    analyzeResult : _analyzeResult,
    code: _code
  };

};

BaseListener.prototype.processNode = function(ctx, ruleCategory) {
  var codeBlock = this.getCodeBlock(ctx); //TODO: AGREGAR FILE NAME
  codeBlock.code = this.processCodeRules(codeBlock, this.codeRules.getRules(ruleCategory)); //TODO: CAMBIAR ACA
  this.addBlock(codeBlock);
};

module.exports = BaseListener;