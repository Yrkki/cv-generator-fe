#!/usr/bin/env node

// SPDX-License-Identifier: Apache-2.0
// Copyright 2018 Georgi Marinov
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

'use strict';

// Install new relic monitoring
require('newrelic');

// Configure port
const port = process.env.PORT || 5000;

// Install express server
const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const listener = require('./listener');

const mapEnv2ConfigData = {
  debug: {
    message: 'Debug mode', envVar: process.env.CV_GENERATOR_FE_DEBUG,
    configKey: 'debug', defaultValue: false
  },
  appName: {
    message: 'Application name', envVar: process.env.CV_GENERATOR_FE_APP_NAME,
    configKey: 'appName', defaultValue: 'CV Generator'
  },
  appPackageName: {
    message: 'Application package name', envVar: process.env.CV_GENERATOR_FE_APP_PACKAGE_NAME,
    configKey: 'appPackageName', defaultValue: 'cv-generator-fe'
  },
  serverEndpointUri: {
    message: 'Server endpoint', envVar: process.env.serverEndpointUri,
    configKey: 'serverEndpointUri', defaultValue: 'http://localhost:3000'
  },
  skipRedirectHttp: {
    message: 'Skip redirect to https', envVar: process.env.CV_GENERATOR_FE_SKIP_REDIRECT_TO_HTTPS,
    configKey: 'skipRedirectHttp', defaultValue: false
  },
  useSpdy: {
    message: 'Use HTTP/2', envVar: process.env.CV_GENERATOR_FE_USE_SPDY,
    configKey: 'useSpdy', defaultValue: false
  },
};

/* Map environment to configuration. */
function mapEnv2Config(data) {
  const message = data.message;
  const envVar = data.envVar;
  const configKey = data.configKey;
  const defaultValue = data.defaultValue || message;
  const key = data.key || configKey;

  const retVal = (envVar || defaultValue);
  app.set(key, retVal);
  // eslint-disable-next-line no-console
  console.info(`${message}: ${retVal}`);
  return retVal;
}

// eslint-disable-next-line no-console
console.log();
const debug = mapEnv2Config(mapEnv2ConfigData.debug);
// override console log
require('./override-console-log')(debug);
// eslint-disable-next-line no-console
console.log();

const appName = mapEnv2Config(mapEnv2ConfigData.appName);
const appPackageName = mapEnv2Config(mapEnv2ConfigData.appPackageName);

const serverEndpointUri = mapEnv2Config(mapEnv2ConfigData.serverEndpointUri);

const skipRedirectHttp = mapEnv2Config(mapEnv2ConfigData.skipRedirectHttp);
const useSpdy = mapEnv2Config(mapEnv2ConfigData.useSpdy);
// eslint-disable-next-line no-console
console.log();

// Node prometheus exporter setup
const options = {
  appName: appPackageName,
  collectDefaultMetrics: true
};
const prometheusExporter = require('@tailorbrands/node-exporter-prometheus');
const promExporter = prometheusExporter(options);
app.use(promExporter.middleware);
app.get('/metrics', promExporter.metrics);

// Compress responses
app.use(compression());

// Load geolocation tools
// ~security: codacy: Found require("child_process"): ESLint_security_detect-child-process
const { execSync } = require('child_process');

// Send server config to app
app.get('/config', function (req, res, next) {
  res.send({
    debug: app.get('debug'),
    appName: app.get('appName'),
    appPackageName: app.get('appPackageName'),
    serverEndpointUri: app.get('serverEndpointUri'),
    skipRedirectHttp: app.get('skipRedirectHttp'),
    useSpdy: app.get('useSpdy')
  });
});

// Get geolocation
app.get('/geolocation', function (req, res, next) {
  // eslint-disable-next-line no-console
  console.info(`server.js: get: /geolocation: req: ${req.protocol} ${req.hostname} ${req.url}`);
  const ip = execSync('curl api.ipify.org').toString();
  res.redirect(`https://api.ipgeolocation.io/ipgeo?ip=${ip}&apiKey=d0650adcae4143cfb48580bf521ffdd0`);
});

// Redirect http to https
/*eslint complexity: ["error", 5]*/
app.get('*', function (req, res, next) {
  // // eslint-disable-next-line no-console
  // console.debug(`server.js: get: req: ${req.protocol} ${req.hostname} ${req.url}`);
  if ((!req.secure || req.headers['x-forwarded-proto'] !== 'https') &&
    !['true', 'TRUE'].includes(skipRedirectHttp) &&
    !['localhost', '192.168.1.2', '192.168.1.6', '192.168.99.100'].includes(req.hostname)
  ) {
    var url = 'https://';
    url += req.hostname;
    url += req.url;
    res.redirect(301, url);
  }
  else
    next(); /* Continue to other routes if we're not redirecting */
});

// Calc the root path
const root = path.join(__dirname, '/dist');

// Serve only the static files form the dist directory
app.use(express.static(root));

// Configure Express Rewrites
app.all('/*', function (req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: root });
});

// Prepare listener options
const listenerOptions = {
  welcome: void 0,
  server: void 0,
  config: {
    useSpdy: app.get('useSpdy') === 'true',
    useHttp: false
  },
  certPath: void 0,
  certName: void 0,
};

/**
 * Start the app by listening on the default port provided, on all network interfaces.
 */

// listener.listen(app, port);
listener.listen(app, port, listenerOptions);
