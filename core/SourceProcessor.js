function SourceProcessor(file, options, rules, analyze) {
  // antlr4 es la librería que nos permite recorrer el código
  var antlr4 = require('antlr4/index');
  // SourceMaker toma un conjunto de modificaciones y las aplica al código original
  var SourceMaker = require('./SourceMaker');
  var platform = '../platform/';

  // Constructores de antlr4 para recorrer el código y realizar acciones sobre el mismo
  var Parser = require(platform + options.platform + options.parser);
  var Lexer = require(platform + options.platform + options.lexer);
  var Listener = require(platform + options.platform + options.listener)[options.listener];

  // reglas a aplicar
  var codeRules;
  if(typeof rules !== 'undefined') {
    codeRules = rules;
  } else {
    codeRules = require(platform + options.platform + options.codeRules);
  }

  // Objetos de antlr4 para recorrer el código y realizar acciones sobre el mismo
  var chars = new antlr4.InputStream(file);
  var lexer = new Lexer[options.lexer](chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new Parser[options.parser](tokens);

  // necesitamos el parse tree
  parser.buildParseTrees = true;

  var tree = parser[options.firstRule]();
  var listener = new Listener(codeRules);

  // se recorre el código y se aplican las reglas
  // con listener.getBlocks() se obtienen los bloques de código
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

  // SourceMaker(...) aplica las modificaciones al código original
  return SourceMaker(file, listener.getBlocks());
}

module.exports = SourceProcessor;
