var JavaCodeRules = [
  {
    id: 1,
    priority: 1,
    name: 'Regla 1',
    description: 'Regla de prueba de metodo',
    type: 'android.method',
    match: function(code) { return true; },
    apply: function(code, ctx) {
      var startToken = code.indexOf('{');
      var comment = '\n// esto es un comentario de metodo\n';
      return code.substring(0, startToken+1) + comment + code.substring(startToken+1, code.length);
    }
  } ,
  {
    id: 2,
    priority: 0,
    name: 'Regla 2',
    description: 'Regla de prueba de clase',
    type: 'android.class',
    match: function(code) { return true; },
    apply: function(code, ctx) {
      var startToken = code.indexOf('{');
      var comment = '\n// esto es un comentario de clase\n';
      return code.substring(0, startToken+1) + comment + code.substring(startToken+1, code.length);
    }
  }

];

module.exports = JavaCodeRules;