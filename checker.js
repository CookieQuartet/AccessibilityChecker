/*
 Parámetros de checker
 -p <platform>: plataforma de análisis. Ej: android
 -x <project>: nombre de proyecto
 */
//----------------------------------------------------------------------------------------------------------------
var _ = require('lodash'),
    glob = require("glob"),
    fs = require('fs'),
    srcProc = require('./core/SourceProcessor'),
    argIndex = {
      platform: process.argv.indexOf('-p') + 1,
      project: process.argv.indexOf('-x') + 1
    },
    platform = argIndex.platform > 0 ? process.argv[argIndex.platform]  : 'android',
    project = argIndex.project > 0 ? process.argv[argIndex.project] : '';

//----------------------------------------------------------------------------------------------------------------
if(argIndex.platform > 0) {
  console.log('Plataforma: ', process.argv[argIndex.platform]);
} else {
  console.log('Plataforma: android (default)');
}
//----------------------------------------------------------------------------------------------------------------
if(project.length > 0) {
  fs.lstat(project, function(err, stats) {
    if (!err && stats.isDirectory()) {
      //----------------------------------------------------------------------------------------------------------
      // busco todas las configuraciones para cada lenguaje involucrado en el proyecto
      // en el caso de Android -> java, xml
      //----------------------------------------------------------------------------------------------------------
      var glOpts = {
            cwd: process.cwd() + '/platform/' + platform
          },
          config = {};
      glob("**/options.js", glOpts, function (er, files) {
        _.each(files, function(file) {
          config[file.split('/')[0]] = require(glOpts.cwd + '/' + file);
        });
        //--------------------------------------------------------------------------------------------------------
        // para cada configuracion disponible, busco los archivos del proyecto que le corresponden
        // y luego proceso cada grupo de archivos
        //--------------------------------------------------------------------------------------------------------
        _.each(config, function(cfg, type) {
          var pattern = "**/*." + type,
              opts = {
                cwd: project,
                ignore: cfg.ignore
              };
          glob(pattern, opts, function (er, files) {
            var output;
            _.each(files, function(filename) {
              try {
                output = srcProc(opts.cwd + '/' + filename, cfg);
                console.log(output);
              } catch(e) {
                console.log(filename);
                console.log(e);
              }
            })
          });
        });
        //--------------------------------------------------------------------------------------------------------
      });
    } else {
      console.log('Error: el proyecto no existe o no es un directorio')
    }
  });
} else {
  console.log('Error: falta el proyecto')
}

