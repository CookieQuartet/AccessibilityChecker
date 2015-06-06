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
      stop = ctx.stop.stop+1;
  return {
      start: start,
      stop: stop,
      code: ctx.start.getInputStream().getText(start, stop)
  }
};

BaseListener.prototype.loadRules = function(rules) {
  return this.codeRules.load(rules);
};

BaseListener.prototype.processCodeRules = function(code, rules) {
  var _code = code;
  _.each(rules, function(rule) {
    if(rule.match(_code)) {
      _code = rule.apply(_code);
    }
  });
  return _code;
};

module.exports = BaseListener;