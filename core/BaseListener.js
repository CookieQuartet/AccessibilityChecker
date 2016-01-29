var _ = require('lodash');
var CodeRules = require('./CodeRules');

/*

Desde el fronend se va a llamar a un metodo que llama a dos metodos:
          - Primero llama al metodo que procesa los nodos y guarda el accessibilityCheckerResultArray
          - Por ultimo llama al getAccessibilityCheckerResult que retorna el resultado.
 */

function BaseListener(rules, mode) {
  antlr4.tree.ParseTreeListener.call(this);
  this.codeRules = new CodeRules(rules);
  this._accessibilityCheckerResult = [];

  return this;
}

var antlr4 = require('antlr4/index');

BaseListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);

BaseListener.prototype.constructor = BaseListener;

BaseListener.prototype.addNodeResult = function(nodeResult) {
  if (nodeResult) {
    _accessibilityCheckerResult.push(nodeResult);
  }
};

BaseListener.prototype.getAccessibilityCheckerResult = function() {
  return this._accessibilityCheckerResult;
};

BaseListener.prototype.getCodeBlock = function(ctx) {
  var startIndex = ctx.start.start,
      stopIndex = ctx.stop.stop+ 1,
      code = ctx.start.getInputStream().getText(start, stop),
      startLine = ctx.start.line,
      stopLine = ctx.stop.line;
  return {
    code: code,
    startIndex: startIndex,
    stopIndex: stopIndex,
    startLine: startLine,
    stopLine: stopLine
  }
};

BaseListener.prototype.processRule = function(code, line, rule) {
  return rule.action(code, line);
};

BaseListener.prototype.processCodeRules = function(codeBlock, rules) {
  var _self = this,
      _result = [];

  _.each(rules, function(rule) {
     var processResult = _self.processRule(codeBlock, rule);

    if (processResult) {
      _result.push(processResult);
    }
  });

  return _result;
};

BaseListener.prototype.processNode = function(ctx, ruleCategory) {
  var codeBlock = this.getCodeBlock(ctx);
  this.addNodeResult(this.processCodeRules(codeBlock, this.codeRules.getRules(ruleCategory)));
};

module.exports = BaseListener;