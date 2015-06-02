var platform = 'android/java';
var options = require('./platform/' + platform + '/options');
var srcProc = require('./core/SourceProcessor');
var output = srcProc(options);

console.log(output);