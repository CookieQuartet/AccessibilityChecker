var _ = require('lodash');
var Q = require('q');


//-----------------------------------------------------------------------------------------
function SocketConnection(io) {
    //-----------------------------------------------------------------------------------------
    io.on('connection', function (socket) {
      //-----------------------------------------------------------------------------------------
      socket.on('ac:socket:analyze', function (data) {
        socket.emit('ac:socket:analyze_response', data);
      });
      //-----------------------------------------------------------------------------------------
      socket.on('ac:socket:process', function (data) {
        socket.emit('ac:socket:process_response', data);
      });
    });
}

module.exports = SocketConnection;