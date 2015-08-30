/*
 Parámetros de checker
 -p <platform>: plataforma de análisis
      Opciones:
      * android/xml
      * android/java
 -f <file>: nombre de archivo
      Ejemplos:
      * 'platform/android/java/test/BeGenerousActivity.java';
      * 'platform/android/xml/test/sample_main.xml';

 -x <project>: nombre de proyecto
 */
//----------------------------------------------------------------------------------------------------------------
var _ = require('lodash'),
    fs = require('fs'),
    srcProc,
    output,
    argIndex,
    platform,
    filename,
    options;

//----------------------------------------------------------------------------------------------------------------
argIndex = {
  platform: process.argv.indexOf('-p') + 1,
  project: process.argv.indexOf('-x') + 1,
  filename: process.argv.indexOf('-f') + 1
};
//----------------------------------------------------------------------------------------------------------------
platform = argIndex.platform > 0 ? argIndex.platform  : 'android/xml';
//----------------------------------------------------------------------------------------------------------------
filename = argIndex.filename > 0 ? process.argv[argIndex.filename] : '';
//----------------------------------------------------------------------------------------------------------------
project = argIndex.project > 0 ? process.argv[argIndex.project] : '';
//----------------------------------------------------------------------------------------------------------------
try {
  options = require('./platform/' + platform + '/options');
} catch(e) {
  options = require('./platform/android/xml/options');
}
//----------------------------------------------------------------------------------------------------------------
srcProc = require('./core/SourceProcessor');
//----------------------------------------------------------------------------------------------------------------
if(project.length > 0) {
  fs.lstat(project, function(err, stats) {
    if (!err && stats.isDirectory()) {
      // Yes it is
    }
  });
} else if(filename.length > 0) {
  fs.lstat(filename, function(err, stats) {
    if (!err && stats.isFile()) {
      try {
        output = srcProc(filename, options);
        console.log(output);
      } catch(e) {
        if(_.isObject(options)) {
          output = 'Error: no es posible encontrar la configuración seleccionada\n';
        }
        if(filename.length == 0) {
          output = 'Error: no se ha seleccionado un archivo\n';
        }
      }
    } else {
      output = 'Error: no existe el archivo\n';
    }
  });
}
//----------------------------------------------------------------------------------------------------------------
// cambio juez
//----------------------------------------------------------------------------------------------------------------
