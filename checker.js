var platform = 'android/java';
var options = require('./platform/' + platform + '/options');
var arg = process.argv[2] ;
var filename = typeof arg !== 'undefined' ? arg : 'platform/android/java/test/BeGenerousActivity.java';
var srcProc = require('./core/SourceProcessor');
var output = srcProc(filename, options);

console.log(output);