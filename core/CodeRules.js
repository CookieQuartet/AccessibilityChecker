var _ = require('lodash');
var CodeRule = require('./CodeRule');

function CodeRules(rules) {
  this.rules = [];
  this.load(rules);
}

CodeRules.prototype.constructor = CodeRules;

CodeRules.prototype.add = function(rule) {
  this.rules.push(new CodeRule(rule));
};

CodeRules.prototype.remove = function(id) {
  _.remove(this.rules, { id: id });
  return _.clone(this.rules);
};

CodeRules.prototype.load = function(rules) {
  var _self = this;
  _.each(rules, function(rule) {
    _self.rules.push(new CodeRule(rule));
  });
};

CodeRules.prototype.getRules = function(type) {
  return _.chain(this.rules).filter({ type: type }).clone().sortBy(['priority', 'id', 'name']).value();
};

module.exports = CodeRules;