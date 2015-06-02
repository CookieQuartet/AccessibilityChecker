function SourceProcessor(options) {
  var antlr4 = require('antlr4/index');
  var fs = require('fs');
  var SourceMaker = require('./SourceMaker');
  var platform = '../platform/';

  var Parser = require(platform + options.platform + options.parser);
  var Lexer = require(platform + options.platform + options.lexer);
  var Listener = require(platform + options.platform + options.listener)[options.listener];

  var file = fs.readFileSync(options.file, "utf8");
  var chars = new antlr4.InputStream(file);
  var lexer = new Lexer[options.lexer](chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new Parser[options.parser](tokens);

  parser.buildParseTrees = true;

  var tree = parser[options.firstRule]();
  var listener = new Listener();

  antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

  return SourceMaker(file, listener.getBlocks());
}

module.exports = SourceProcessor;
