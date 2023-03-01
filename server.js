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

mapEnv2Config(mapEnv2ConfigData.appName);
mapEnv2Config(mapEnv2ConfigData.appPackageName);
mapEnv2Config(mapEnv2ConfigData.serverEndpointUri);
mapEnv2Config(mapEnv2ConfigData.skipRedirectHttp);
mapEnv2Config(mapEnv2ConfigData.useSpdy);
// eslint-disable-next-line no-console
console.log();

// Set up rate limiter: maximum number of requests per minute
const expressRateLimit = require('express-rate-limit');
const limiter = expressRateLimit.rateLimit({ windowMs: 1000, max: 5000 });
app.use('/*', limiter);

// Node prometheus exporter setup
const options = {
  appName: app.get('appPackageName'),
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

const projectServerLocations = [
  'https://cv-generator-project-server.herokuapp.com',
  'https://cv-generator-project-server-eu.herokuapp.com',
  'http://localhost:3000',
];

const ownEcosystemLocations = [
  ...projectServerLocations,

  'https://marinov.link',
  'http://marinov.tk',
  'http://marinov.ml',

  'https://cv-generator-fe.herokuapp.com',
  'https://cv-generator-fe-eu.herokuapp.com',

  'https://cv-generator-life-map.herokuapp.com',

  'https://cv-generator-life-adapter.herokuapp.com',
  'https://cv-generator-life-adapter-eu.herokuapp.com',
];

const originalImgSrc = [
  'https://stackshare.io',
  'https://www.npmjs.com',
  'https://img.shields.io',
  'https://s3.amazonaws.com',
  'https://api.travis-ci.org',
  'https://ci.appveyor.com',
  'https://app.circleci.com',
  'https://codecov.io',
  'https://coveralls.io',
  'https://david-dm.org',
  'https://app.snyk.io',
  'https://app.codacy.com',
  'https://codeclimate.com',
  'https://sonarcloud.io',
  'https://dashboard.heroku.com',
  'https://gitlab.com',
  'https://bitbucket.org',
  'https://app.stackhawk.com',
  'https://www.codefactor.io',
  'https://app.datadoghq.eu',
];

const additionalImgSrc = [
  'https://github.com',

  'https://circleci.com',
  'https://api.travis-ci.com',

  'https://scan.coverity.com',
  'https://api.codeclimate.com',

  'https://snyk.io',

  'https://www.bridgecrew.cloud',

  'https://api.netlify.com',

  'https://github-readme-stats.vercel.app',
  'https://app.fossa.com',
  'https://contrib.rocks',

  'https://bestpractices.coreinfrastructure.org',

  'https://ipgeolocation.io',
];

const imgSrc = [
  'img-src \'self\'',
  'data:',

  ...ownEcosystemLocations,

  ...originalImgSrc,
  ...additionalImgSrc,
];

const defaultSrc = [
  'default-src \'self\'',
  'default-src \'none\'',

  ...projectServerLocations,

  'https://ka-f.fontawesome.com',
  'https://cdn.plot.ly',

  'https://ci.appveyor.com',
  'https://api.ipgeolocation.io',
];

const scriptSrc = [
  'script-src \'self\'',
  '\'unsafe-inline\'',
  '\'unsafe-eval\'',

  'https://cdn.jsdelivr.net',
  'https://cdn.plot.ly',
  'https://kit.fontawesome.com',
];

const mediaSrc = [
  'media-src \'self\'',
];

const styleSrc = [
  'style-src \'self\'',
  '\'unsafe-inline\'',

  'https://cdn.jsdelivr.net',
];

const fontSrc = [
  'font-src \'self\'',

  'https://ka-f.fontawesome.com',
  'https://fonts.gstatic.com',
];

/**
 * Construct header section.
 */

function constructHeaderSection(array) {
  return array.join(' ');
}

/**
 * Construct CSP header.
 */

function constructCSPHeader() {
  return [
    constructHeaderSection(defaultSrc),
    constructHeaderSection(scriptSrc),
    constructHeaderSection(imgSrc),
    constructHeaderSection(mediaSrc),
    constructHeaderSection(styleSrc),
    constructHeaderSection(fontSrc),

    'base-uri \'self\'',
    'form-action \'self\'',
    'frame-ancestors \'self\'',
    'frame-src \'self\'',
    'object-src \'none\'',
    // 'report-to default',
    // 'script-src-attr \'none\'',
    // 'upgrade-insecure-requests',
  ].join('; ');
}

/**
 * Set response headers.
 */

function setResponseHeaders(res) {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', '*');

  res.setHeader('Content-Security-Policy', constructCSPHeader());

  // Cross-Origin-Embedder-Policy: (unsafe-none|require-corp); report-to="default"
  // // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none; report-to=default');

  // Cross-Origin-Embedder-Policy-Report-Only: (unsafe-none|require-corp); report-to="default"
  res.setHeader('Cross-Origin-Embedder-Policy-Report-Only', 'unsafe-none; report-to=default');

  // Cross-Origin-Opener-Policy: (same-origin|same-origin-allow-popups|unsafe-none); report-to="default"
  // // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none; report-to=default');

  // Cross-Origin-Opener-Policy-Report-Only: (same-origin|same-origin-allow-popups|unsafe-none); report-to="default"
  res.setHeader('Cross-Origin-Opener-Policy-Report-Only', 'unsafe-none; report-to=default');

  // Cross-Origin-Resource-Policy: (same-site|same-origin|cross-origin)
  // res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'unsafe-none; report-to=default');

  // res.setHeader('Origin-Agent-Cluster', '?1');

  // res.setHeader('Permissions-Policy', 'fullscreen=(), geolocation=()');
  res.setHeader('Permissions-Policy', 'fullscreen=()');

  // res.setHeader('Referrer-Policy', 'same-origin, strict-origin-when-cross-origin');
  res.setHeader('Referrer-Policy', 'no-referrer, strict-origin-when-cross-origin');

  // res.setHeader('Strict-Transport-Security', 'max-age=63072000');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  // res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  res.setHeader('X-XSS-Protection', '1; mode=block');
  // res.setHeader('X-XSS-Protection', '0');

  res.removeHeader('X-Powered-By');
}

// Send server config to app
app.get('/config', function (req, res, next) {
  setResponseHeaders(res);

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
app.use('/geolocation', limiter);
app.get('/geolocation', function (req, res, next) {
  setResponseHeaders(res);

  // eslint-disable-next-line no-console
  console.info(`server.js: get: /geolocation: req: ${req.protocol} ${req.hostname} ${req.url}`);
  const ip = execSync('curl api.ipify.org').toString();
  res.redirect(`https://api.ipgeolocation.io/ipgeo?ip=${ip}&apiKey=d0650adcae4143cfb48580bf521ffdd0`);
});

// Redirect http to https
/*eslint complexity: ["error", 5]*/
app.get('*', function (req, res, next) {
  setResponseHeaders(res);

  // // eslint-disable-next-line no-console
  // console.debug(`server.js: get: req: ${req.protocol} ${req.hostname} ${req.url}`);
  if ((!req.secure || req.headers['x-forwarded-proto'] !== 'https') &&
    !['true', 'TRUE'].includes(app.get('skipRedirectHttp')) &&
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
  setResponseHeaders(res);

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

// Start the app by listening on the default port provided, on all network interfaces. Options parameter optional.
listener.listen(app, port, listenerOptions);
