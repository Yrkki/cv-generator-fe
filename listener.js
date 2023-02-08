#!/usr/bin/env node

// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/*eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }]*/

'use strict';

/**
 * Server configuration, instantiation, and listener invokation.
 */

/**
 * Module dependencies.
 */

var http = require('http');
var fs = require('fs');
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
 * Bind pipe or port.
 */

 function bindPipeOrPort(item, pipe, port) {
  return typeof item === 'string'
    ? 'pipe ' + pipe
    : 'port ' + port;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = bindPipeOrPort(port, port, port);

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    // break; // break omitted

    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(bind + ' is already in use');
      process.exit(1);
    // break; // break omitted

    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  var addr = server.address();
  var bind = bindPipeOrPort(addr, addr, addr.port);
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
 * Get the application name.
 */

function appPackageName(app) {
  return app.get('appPackageName') || nodeName();
}

/**
 * Check synchronously if file exist in file system.
 * ~security: codacy: path traversal: ESLint_security_detect-non-literal-fs-filename
 */

function existsSync(dirnameCertPath, targetPath) {
  // ~security: codacy: unsafe: ESLint_security_detect-non-literal-fs-filename
  return fs.existsSync(path.join(dirnameCertPath, targetPath));
}

/**
 * Get spdy options.
 */

function getSpdyOptions(certName, certPath) {
  // Prepare http/2 options
  let dirnameCertPath;
  for (const iterator of [
    path.join(__dirname, 'bin'),
    path.join(__dirname),
    path.join(__dirname, '..')
  ]) {
    dirnameCertPath = path.join(iterator, certPath);
    if (existsSync(dirnameCertPath, `${certName}.key`)) {
      break;
    }
  }
  const spdyOptions = {
    key: existsSync(dirnameCertPath, `${certName}.key`),
    cert: existsSync(dirnameCertPath, `${certName}.crt`)
  };

  return spdyOptions;
}

/**
 * Create HTTP server.
 */

function createServer(app, config, certName, certPath = 'cert') {
  var server;

  if (config.useSpdy) {
    // Install http/2
    const spdy = require('spdy');
    // Get certificate name.
    if (!certName) { certName = appPackageName(app); }
    // Prepare spdy options
    var spdyOptions = getSpdyOptions(certName, certPath);
    // Serve http/2
    server = spdy.createServer(spdyOptions, app);
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
 * Connect to the server or create it.
 */

function connectServer(app, options) {
  let { welcome, server, config, certPath, certName } = options;

  // Config HTTP server.
  if (!config) {
    // config = { useSpdy: false, useHttp: true }; // use http
    config = { useSpdy: true, useHttp: false }; // use spdy
  }

  // Create HTTP server.
  if (!server) {
    server = createServer(app, config, certName, certPath);
  }

  // Show connection message.
  if (!welcome) {
    welcome = (error) => showConnectionMessage(error, app);
  }

  return { welcome, server, config };
}

/**
 * Start the app by listening on the default port provided, on all network interfaces.
 */

function listen(app, port, options) {
  // connect to server
  const { welcome, server, config } = connectServer(app, options);

  if (config.useSpdy || config.useHttp) {
    // Serve http/2 or
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
