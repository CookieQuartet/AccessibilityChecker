//var platform = 'android/java';
var platform = 'android/xml';
var options = require('./platform/' + platform + '/options');
var arg = process.argv[2] ;
//var filename = typeof arg !== 'undefined' ? arg : 'platform/android/java/test/BeGenerousActivity.java';
var filename = 'platform/android/xml/test/sample_main.xml';
var srcProc = require('./core/SourceProcessor');
var output = srcProc(filename, options);

console.log(output);