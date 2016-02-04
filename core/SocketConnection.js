var _ = require('lodash');
var Q = require('q');
var profileManager = require('../platform/profiles.js');
var SourceProcessor = require('./SourceProcessor');
var SourceMaker = require('./SourceMaker');

//-----------------------------------------------------------------------------------------
function SocketConnection(io) {
    //-----------------------------------------------------------------------------------------
    io.on('connection', function (socket) {
      //-----------------------------------------------------------------------------------------
      socket.on('ac:socket:get_profiles', function (data) {
        socket.emit('ac:socket:profiles', profileManager.profiles);
      });

      socket.on('ac:socket:analyze', function (data) {
        // obtener las opciones para el tipo de archivo
        var options = require('../platform/' + data.platform + '/' + data.extension + '/options.js');
        // obtener las reglas que aplican al archivo según plataforma, tipo y perfil
        var rules = profileManager.getRules(data.profile, data.extension);
        // analizar el código
        var result = SourceProcessor(data.file, options, rules);

        if(result.length > 0) {
          var _data = _.each(result, function(item){
            item.name = data.name;
            item.fullPath = data.fullPath;
            item.extension = data.extension;
            item.selected = false;
            // onlyHint debe venir en la salida de SourceProcessor
            //item.onlyHint = false;
          });
          socket.emit('ac:socket:analyze_response', _data);
        }
      });
      //-----------------------------------------------------------------------------------------
      socket.on('ac:socket:process', function (data) {
        // procesar el código
        // data.code = SourceMaker(data.code, data.blocks);
        data.code += '<!-- comentario... -->';
        socket.emit('ac:socket:process_response', data);
      });
    });
}

module.exports = SocketConnection;