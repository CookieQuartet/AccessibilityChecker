var _ = require('lodash');

function CodeRule(options) {
  this.options = _.extend({
    id: 1,
    priority: 1,
    name: 'Rule 34',
    description: 'You know the rule',
    type: 'android.method',
    match: function(code) { return true; },
    apply: function(code) { return code; }
  }, options);
  return this;
}

CodeRule.prototype.constructor = CodeRule;

CodeRule.prototype.match = function(code) {
  return this.options.match(code);
};

CodeRule.prototype.apply = function(code) {
  return this.options.apply(code);
};

module.exports = CodeRule;