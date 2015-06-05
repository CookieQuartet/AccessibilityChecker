var options = {
  file: 'platform/android/java/test/BeGenerousActivity.java',
  platform: 'android/java/',
  parser: 'JavaParser',
  lexer: 'JavaLexer',
  listener: 'JavaListener',
  codeRules: 'JavaCodeRules',
  firstRule: 'compilationUnit'
};

module.exports = options;