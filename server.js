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

// Install express server
const express = require('express');
const cors = require('cors')
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
  port: {
    message: 'Port', envVar: process.env.PORT,
    configKey: 'port', defaultValue: 5000
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

const cvGeneratorFeEndpoints = [
  'https://marinov.link',
  'https://cvgenerator.c.marinov.link',
  'https://pzrydhpd2v.eu-west-1.awsapprunner.com',

  'https://cv-generator-fe.herokuapp.com',
  'https://cv-generator-fe-eu.herokuapp.com',
];

const lifeMapEndpoints
 = [
  'https://cv-generator-life-map.herokuapp.com',
];

const projectServerEndpoints
 = [
  'https://cv-generator-project-server.herokuapp.com',
  'https://cv-generator-project-server-eu.herokuapp.com',
  'https://fmfbhi92pn.eu-west-1.awsapprunner.com',
];

const lifeAdapterEndpoints = [
  'https://cv-generator-life-adapter.herokuapp.com',
  'https://cv-generator-life-adapter-eu.herokuapp.com',
  'https://22kpkzjxsg.eu-west-1.awsapprunner.com/',
];

const ownEcosystemLocations = [
  ...cvGeneratorFeEndpoints,
  ...lifeMapEndpoints,
  ...projectServerEndpoints,
  ...lifeAdapterEndpoints,
];

const originalImgSrc = [
  'https://stackshare.io',
  'https://www.npmjs.com',
  'https://img.shields.io',
  'https://s3.amazonaws.com',
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
  'https://qlty.sh/v1/badges',
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
  'https://www.bestpractices.dev',

  'https://user-images.githubusercontent.com',

  'https://ipgeolocation.io',
];

const defaultLocations = [
  ...ownEcosystemLocations,

  ...originalImgSrc,
  ...additionalImgSrc,

  'https://cdn.plot.ly/plotly-3.0.1.min.js',
  'https://cdn.plot.ly/world_50m.json',

  'https://ci.appveyor.com/api/projects/Yrkki/cv-generator-fe/history',
  'https://api.ipgeolocation.io',
];

const defaultSrc = [
  'default-src \'self\'',

  'data:',
  '\'unsafe-inline\'',
  // '\'unsafe-eval\'',

  ...defaultLocations,
];

const connectSrc = [
  'connect-src \'self\'',
  ...defaultLocations,
];

const scriptSrc = [
  'script-src \'self\'',
  '\'unsafe-inline\'',
  '\'nonce-951657334\'',
  '\'strict-dynamic\'',
];

const scriptSrcAttr = [
  'script-src-attr \'self\'',
  '\'unsafe-inline\'',
];

const imgSrc = [
  'img-src \'self\'',
  'data:',
  ...defaultLocations,
];

const mediaSrc = [
  'media-src \'self\'',
];

const styleSrc = [
  'style-src \'self\'',
  '\'unsafe-inline\'',
];

const fontSrc = [
  'font-src \'self\'',

  'https://fonts.gstatic.com',
];

/**
 * Construct header section.
 */

function constructHeaderSection(array) {
  return array.join(' ');
}

/**
 * Construct CSP values array.
 */

function constructCSPValuesArray() {
  return [
    constructHeaderSection(defaultSrc),
    constructHeaderSection(connectSrc),
    constructHeaderSection(scriptSrc),
    constructHeaderSection(scriptSrcAttr),
    constructHeaderSection(imgSrc),
    constructHeaderSection(mediaSrc),
    constructHeaderSection(styleSrc),
    constructHeaderSection(fontSrc),
  ];
}

/**
 * Construct CSP header.
 */

function constructCSPHeader() {
  return [
    ...constructCSPValuesArray(),

    'base-uri \'none\'',

    'form-action \'self\'',
    'frame-ancestors \'self\'',
    'frame-src \'self\'',
    'object-src \'none\'',
    // 'upgrade-insecure-requests',

    'require-trusted-types-for \'script\'',
    'trusted-types default'
  ];
}

/**
 * Construct CORS options.
 */

function constructCorsOptions() {
  return constructCSPValuesArray();
}

// Use CORS
app.use(cors(constructCorsOptions()))

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
mapEnv2Config(mapEnv2ConfigData.port);
// eslint-disable-next-line no-console
console.log();

// Set up rate limiter: maximum number of requests per minute
const expressRateLimit = require('express-rate-limit');
const limiter = expressRateLimit.rateLimit({ windowMs: 1000, max: 5000 });
app.use('/{*splat}', limiter);

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

/**
 * Set response content type header.
 */

function setResponseContentType(req, res) {
  const mimeTypes = {
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.webmanifest': 'application/manifest+json',
    '.txt': 'text/plain',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.css': 'text/css',
    '.sass': 'text/x-sass',
    '.scss': 'text/x-scss',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  Object.entries(mimeTypes).forEach(([key, value]) => {
    if (req.path.endsWith(key)) {
      res.setHeader('Content-Type', value);
    }
  });
}

/**
 * Set response headers.
 */

function setResponseHeaders(req, res) {
  setResponseContentType(req, res);

  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', '*');

  res.setHeader('Content-Security-Policy', constructCSPHeader());

  // Cross-Origin-Embedder-Policy: (unsafe-none | require-corp | credentialless)
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');

  // Cross-Origin-Embedder-Policy-Report-Only: (unsafe-none|require-corp)
  res.setHeader('Cross-Origin-Embedder-Policy-Report-Only', 'unsafe-none');

  // Cross-Origin-Opener-Policy: (same-origin|same-origin-allow-popups|unsafe-none)
  // // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');

  // Cross-Origin-Opener-Policy-Report-Only: (same-origin|same-origin-allow-popups|unsafe-none)
  res.setHeader('Cross-Origin-Opener-Policy-Report-Only', 'unsafe-none');

  // Cross-Origin-Resource-Policy: (same-site|same-origin|cross-origin)
  // res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  // res.setHeader('Origin-Agent-Cluster', '?1');

  // res.setHeader('Permissions-Policy', 'fullscreen=(), geolocation=()');
  res.setHeader('Permissions-Policy', 'fullscreen=()');

  // res.setHeader('Referrer-Policy', 'same-origin, strict-origin-when-cross-origin');
  res.setHeader('Referrer-Policy', 'no-referrer, strict-origin-when-cross-origin');

  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

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
app.get('/config', function (req, res) {
  setResponseHeaders(req, res);

  res.send({
    debug: app.get('debug'),
    appName: app.get('appName'),
    appPackageName: app.get('appPackageName'),
    serverEndpointUri: app.get('serverEndpointUri'),
    skipRedirectHttp: app.get('skipRedirectHttp'),
    useSpdy: app.get('useSpdy'),
    port: app.get('port'),
  });
});

// Get geolocation
app.use('/geolocation', limiter);
app.get('/geolocation', function (req, res) {
  setResponseHeaders(req, res);

  // eslint-disable-next-line no-console
  console.info(`server.js: get: /geolocation: req: ${req.protocol} ${req.hostname} ${req.url}`);
  const ip = execSync('curl api.ipify.org').toString();
  res.redirect(`https://api.ipgeolocation.io/ipgeo?ip=${ip}&apiKey=d0650adcae4143cfb48580bf521ffdd0`);
});

// Redirect http to https
/*eslint complexity: ["error", 5]*/
app.use(function (req, res, next) {
  const skipRedirectHttp = ['true', 'TRUE'].includes(app.get('skipRedirectHttp'));

  const schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const target = `${req.hostname}${req.originalUrl}`;

  // // eslint-disable-next-line no-console
  // console.debug(`server.js: get: req: ${req.protocol} ${target}`);
  if (!skipRedirectHttp &&
    schema !== 'https' &&
    !req.hostname.includes('localhost')
  ) {
    const url = `https://${target}`;

    // // eslint-disable-next-line no-console
    // console.debug(`  redirecting to: ${url}\n`);
    res.redirect(url);
  }
  else {
    setResponseHeaders(req, res);

    // // eslint-disable-next-line no-console
    // console.debug(`  passing\n`);
    next(); /* Continue to other routes if we're not redirecting */
  }
});

// Calc the root path
const root = path.join(__dirname, '/dist');

// Serve only the static files form the root directory
app.use(express.static(root));

// Configure Express Rewrites
app.all('/{*splat}', function (req, res) {
  setResponseHeaders(req, res);

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

// Configure port
const port = app.get('port');

// Start the app by listening on the default port provided, on all network interfaces. Options parameter optional.
listener.listen(app, port, listenerOptions);
