#!/usr/bin/env node

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
var listener = require('./listener')

/* Map environment to configuration. */
function mapEnv2Config(message, envVar, configKey, defaultValue = message, key = configKey) {
  const retVal = (envVar || defaultValue);
  app.set(key, retVal);
  // eslint-disable-next-line no-console
  console.info(`${message}: ${retVal}`);
  return retVal;
};

// eslint-disable-next-line no-console
console.log();
const debug = mapEnv2Config('Debug mode', process.env.CV_GENERATOR_FE_DEBUG, 'debug', false);
// override console log
require('./override-console-log')(debug);
// eslint-disable-next-line no-console
console.log();

const appName = mapEnv2Config('Application name', process.env.CV_GENERATOR_FE_APP_NAME,
  'appName', 'CV Generator');
const appPackageName = mapEnv2Config('Application package name', process.env.CV_GENERATOR_FE_APP_PACKAGE_NAME,
  'appPackageName', 'cv-generator-fe');

const serverEndpointUri = mapEnv2Config('Server endpoint', process.env.serverEndpointUri,
  'serverEndpointUri', 'http://localhost:3000');

const skipRedirectHttp = mapEnv2Config('Skip redirect to https', process.env.CV_GENERATOR_FE_SKIP_REDIRECT_TO_HTTPS,
  'skipRedirectHttp', false);
const useSpdy = mapEnv2Config('Use HTTP/2', process.env.CV_GENERATOR_FE_USE_SPDY,
  'useSpdy', false);
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
const { execSync } = require('child_process');

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
    next() /* Continue to other routes if we're not redirecting */
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

/**
 * Start the app by listening on the default port provided, on all network interfaces.
 */

// listener.listen(app, port);
listener.listen(app, port, undefined, undefined, { useSpdy: app.get('useSpdy') === 'true', useHttp: false });
