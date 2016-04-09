var options = {
  //file: 'platform/android/java/test/BeGenerousActivity.java',
  platform: 'android/xml/',
  fileExtension: 'xml',
  ignore: ['/*/.idea/**', '/*/app/build/**', '/**/build/**', 'build/**'],
  parser: 'XMLParser',
  lexer: 'XMLLexer',
  listener: 'XMLParserListener',
  codeRules: 'XMLCodeRules',
  firstRule: 'document'
};

module.exports = options;