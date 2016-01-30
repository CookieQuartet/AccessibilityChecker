var _ = require('lodash');

var profiles = [
  {
    id: 1,
    name: 'Visión reducida',
    platform: 'android',
    rules: [
      {
        type: 'xml',
        id: 1
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



module.exports = {
  profiles: profiles,
  getRules: GetRules
};