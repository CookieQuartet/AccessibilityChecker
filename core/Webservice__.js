function Webservice(_port) {
  var express = require('express');
  var http = require('http');
  var path = require('path');
  var app = express();
  var web_port = _port || normalizePort(process.env.PORT || '3000');
  var socket_port = 3001;

  var helperSocketConnection = require('./SocketConnection.js');

  app.use(express.static(path.join(__dirname, '../assets')));
  app.use(express.static(path.join(__dirname, '../interfaces/webservice')));
  app.use(express.static(path.join(__dirname, '../bower_components')));
  app.use(express.static(path.join(__dirname, '../node_modules')));

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });

  app.set('port', web_port);

  var server = http.createServer(app);

  // servidor web
  server.on('error', function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
  server.on('listening', function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    //console.log('Listening on ' + bind);
    console.info('Servicio web iniciado en el puerto ', bind);
  });
  server.listen(web_port);

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  // servidor de sockets
  var socket_server = require('http').Server(express());
  var io = require('socket.io')(socket_server);
  socket_server.listen(socket_port);

  helperSocketConnection(io);

  return {
    app: {
      instance: app,
      port: web_port
    },
    socket: {
      instance: io,
      port: socket_port
    }
  };
}

//me está dando errores en github al hacer commit...
module.exports = Webservice;
