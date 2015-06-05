var JavaCodeRules = [
  {
    id: 1,
    priority: 1,
    name: 'Regla 1',
    description: 'Regla de prueba',
    type: 'android.method',
    match: function(code) { return true; },
    apply: function(code) {
      var startToken = code.indexOf('{');
      var comment = '\n// esto es un comentario\n';
      return code.substring(0, startToken+1) + comment + code.substring(startToken+1, code.length);
    }
  }
];

module.exports = JavaCodeRules;