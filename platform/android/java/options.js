var options = {
  //file: 'platform/android/java/test/BeGenerousActivity.java',
  platform: 'android/java/',
  fileExtension: 'java',
  ignore: ['/*/.idea/**', '/*/app/build/**', '/**/build/**', 'build/**'],
  parser: 'JavaParser',
  lexer: 'JavaLexer',
  listener: 'JavaListener',
  codeRules: 'JavaCodeRules',
  firstRule: 'compilationUnit'
};

module.exports = options;