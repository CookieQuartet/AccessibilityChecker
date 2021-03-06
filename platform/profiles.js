var _ = require('lodash');

var profiles = [
  {
    id: 1,
    name: 'todos',
    description: 'Todos',
    platform: 'android',
    rules: [
      {
        type: 'xml',
        id: 1
      },
      {
        type: 'xml',
        id: 2
      },
      {
        type: 'xml',
        id: 3
      },
      {
        type: 'xml',
        id: 4
      },
      {
        type: 'xml',
        id: 5
      }
    ]
  },
  {
    id: 2,
    name: 'vision_reducida',
    description: 'Visión reducida',
    platform: 'android',
    rules: [
      {
        type: 'xml',
        id: 1
      },
      {
        type: 'xml',
        id: 2
      },
      {
        type: 'xml',
        id: 3
      },
      {
        type: 'xml',
        id: 4
      },
      {
        type: 'xml',
        id: 5
      }
    ]
  }
];

function GetRules(id, type) {
  var profile = _.find(profiles, { id: id });
  var rules = require('./' + profile.platform + '/' + type + '/CodeRules.js');
  var ids = _.filter(profile.rules, { type: type }).map(function(rule) { return rule.id; });

  return _.filter(rules, function(rule) {
    return _.includes(ids, rule.id);
  });
}

function GetRulesByName(name, type) {
  var profile = _.find(profiles, { name: name });
  var rules = require('./' + profile.platform + '/' + type + '/CodeRules.js');
  var ids = _.filter(profile.rules, { type: type }).map(function(rule) { return rule.id; });

  return _.filter(rules, function(rule) {
    return _.includes(ids, rule.id);
  });
}


module.exports = {
  profiles: profiles,
  getRules: GetRules,
  getRulesByName: GetRulesByName
};