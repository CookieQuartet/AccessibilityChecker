var options = {
  file: 'platform/android/java/test/BeGenerousActivity.java',
  platform: 'android/java/',
  parser: 'JavaParser',
  lexer: 'JavaLexer',
  listener: 'JavaListener',
  firstRule: 'compilationUnit'
};


var srcProc = require('./core/SourceProcessor');

console.log(srcProc(options));