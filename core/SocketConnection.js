var _ = require('lodash');
var Q = require('q');
var profileManager = require('../platform/profiles.js');
var SourceProcessor = require('./SourceProcessor');

//-----------------------------------------------------------------------------------------
function SocketConnection(io) {
    //-----------------------------------------------------------------------------------------
    io.on('connection', function (socket) {
      //-----------------------------------------------------------------------------------------
      socket.on('ac:socket:get_profiles', function (data) {
        socket.emit('ac:socket:profiles', profileManager.profiles);
      });

      socket.on('ac:socket:analyze', function (data) {
        // analizar el código
        /*
        var _data = {
          file: _item.name,
          fullPath: _item.fullPath,
          selected: false,
          extension: parts[parts.length-1],
          description: 'Descripcion del problema',
          snippet: content.substring(0, 350),
          line: 100
        };
        */
        var options = require('../platform/' + data.platform + '/' + data.extension + '/options.js');
        var rules = profileManager.getRules(data.profile.id, data.extension);
        var result = SourceProcessor(data.file, options, rules);

        if(result.length > 0) {
          var _data = _.each(result, function(item){
            item.name = data.name;
            item.fullPath = data.fullPath;
            item.extension = data.extension;
            item.platform = data.platform;
            item.profile = data.profile;
            item.selected = false;
          });
          socket.emit('ac:socket:analyze_response', _data);
        }
      });
      //-----------------------------------------------------------------------------------------
      socket.on('ac:socket:process', function (data) {
        // procesar el código
        socket.emit('ac:socket:process_response', data);
      });
    });
}

module.exports = SocketConnection;