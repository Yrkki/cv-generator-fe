#!/usr/bin/env node

'use strict';

/**
 * Server configuration, instantiation, and listener invokation.
 */

/**
 * Module dependencies.
 */

var http = require('http');
var path = require('path');

/**
 * Get port from environment and store in Express.
 */

/**
 * Normalize a port into a number, string, or false.
 */

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  // eslint-disable-next-line no-console
  console.debug('Listening on ' + bind + '.');
  // eslint-disable-next-line no-console
  console.debug();
}

/**
 * Show connection message.
 */

function showConnectionMessage(error, app) {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return process.exit(1);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Welcome to the ${app.get('appName')}.`);
    // eslint-disable-next-line no-console
    console.log();
  }
}

/**
 * Get the application name.
 */

function appPackageName(app) {
  return app.get('appPackageName') || nodeName();
}

/**
 * Get the name of the node from the basename of the current working directory.
 */

function nodeName() {
  let dirName;
  for (const iterator of [
    path.join(__dirname),
    path.join(__dirname, '..')
  ]) {
    dirName = path.parse(path.normalize(iterator)).base;
    if (!['bin', 'dist'].includes(dirName)) {
      break;
    }
  }
  return dirName;
}

/**
 * Create HTTP server.
 */

function createServer(app, config, certPath = 'cert', certName) {
  var server;

  // Get certificate name.
  if (!certName) {
    certName = appPackageName(app);
  }

  if (config.useSpdy) {
    // Install http/2
    const spdy = require('spdy')
    const fs = require('fs');

    // Prepare http/2 options
    let dirnameCertPath;
    for (const iterator of [
      path.join(__dirname, 'bin'),
      path.join(__dirname),
      path.join(__dirname, '..')
    ]) {
      dirnameCertPath = path.join(iterator, certPath);
      if (fs.existsSync(path.join(dirnameCertPath, `${certName}.key`))) {
        break;
      }
    }
    const spdy_options = {
      key: fs.readFileSync(path.join(dirnameCertPath, `${certName}.key`)),
      cert: fs.readFileSync(path.join(dirnameCertPath, `${certName}.crt`))
    }

    // Serve http/2
    server = spdy.createServer(spdy_options, app)
    // eslint-disable-next-line no-console
    console.log('Using HTTP/2.');
  } else if (config.useHttp) {
    // Create HTTP server
    server = http.createServer(app);
    // eslint-disable-next-line no-console
    console.log('Using HTTP.');
  } else {
    server = app;
    // eslint-disable-next-line no-console
    console.log('Using Express.');
  }

  return server;
}

/**
 * Start the app by listening on the default port provided, on all network interfaces.
 */

function listen(app, port, welcome, server, config, certPath, certName) {
  // Config HTTP server.
  if (!config) {
    // config = { useSpdy: false, useHttp: true }; // use http
    config = { useSpdy: true, useHttp: false }; // use spdy
  }

  // Create HTTP server.
  if (!server) {
    server = createServer(app, config, certPath, certName);
  }

  // Show connection message.
  if (!welcome) {
    welcome = (error) => showConnectionMessage(error, app);
  }

  if (config.useSpdy) {
    // Serve http/2
    server.listen(port, welcome);
    server.on('error', (error) => onError(error, port));
    server.on('listening', () => onListening(server));
  } else if (config.useHttp) {
    // Listen on provided port, on all network interfaces
    server.listen(port, welcome);
    server.on('error', (error) => onError(error, port));
    server.on('listening', () => onListening(server));
  } else {
    // Start the app by listening on the default port
    app.listen(port, welcome);
    app.on('error', (error) => onError(error, port));
    app.on('listening', () => onListening(app));
  }
}

module.exports = { normalizePort: normalizePort, listen: listen };
