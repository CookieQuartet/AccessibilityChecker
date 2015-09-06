var _ = require('lodash');
var CodeRules = require('./CodeRules');

function BaseListener(rules) {
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
      code = ctx.start.getInputStream().getText(start, stop);
  return {
      start: start,
      stop: stop,
      code: code, /* the modified code */
      originalCode: code,
      ctx: ctx
  }
};

BaseListener.prototype.loadRules = function(rules) {
  return this.codeRules.load(rules);
};

BaseListener.prototype.matchRule = function(code, rule) {
  return true;
};

BaseListener.prototype.applyRule = function(code, rule) {
  return rule.apply(code);
};

BaseListener.prototype.processCodeRules = function(codeBlock, rules) {
  var _self = this,
      _code = codeBlock.code;
  _.each(rules, function(rule) {
    if(rule.match(_code)) {
      _code = rule.apply(_code);
    }
  });
  return _code;
};

BaseListener.prototype.processNode = function(ctx, ruleCategory) {
  var codeBlock = this.getCodeBlock(ctx);
  codeBlock.code = this.processCodeRules(codeBlock, this.codeRules.getRules(ruleCategory));
  this.addBlock(codeBlock);
};

module.exports = BaseListener;