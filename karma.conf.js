// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set(merge({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: pluginsConfig(),
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: coverageIstanbulReporterConfig(),
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'coverage', 'kjhtml', 'html'],
    preprocessors: { 'src/**/*.ts': ['coverage'] },
    jasmineHtmlReporter: jasmineHtmlReporterConfig(),
    htmlReporter: htmlReporterConfig(),
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['CustomChrome'],
  }, extendedConfig()));

  adjustConfig(config);
};

function extendedConfig() {
  return {
    customLaunchers: customLaunchers(),

    singleRun: false,
    restartOnFileChange: true,
    concurrency: Infinity,

    browserDisconnectTimeout: 60 * 1000, // default 2000
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10000

    browserDisconnectTolerance: 1, // default 0
    captureTimeout: 5 * 60 * 1000 //default 60000
  };
}

function pluginsConfig() {
  return [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-htmlfile-reporter'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage'),
    require('@angular-devkit/build-angular/plugins/karma')
  ];
}

function coverageIstanbulReporterConfig() {
  return {
    type: 'text-summary',
    dir: require('path').join(__dirname, './coverage'),
    subdir: '.',
    reporters: [
      { type: 'html' },
      { type: 'lcovonly' },
      { type: 'text-summary' }
    ],
    fixWebpackSourcePaths: true,
    thresholds: {
      statements: 90,
      lines: 90,
      branches: 60,
      functions: 90
    }
  };
}

function jasmineHtmlReporterConfig() {
  return merge({
    outputFile: 'coverage/jasmine-unit-tests.html',
    suppressAll: true, // removes the duplicated traces
  }, reporterConfig());
}

function htmlReporterConfig() {
  return merge({
    outputFile: 'coverage/unit-tests.html',
  }, reporterConfig());
}

function reporterConfig() {
  return {
    pageTitle: 'CV Generator Unit Tests',
    subPageTitle: 'Frontend Dashboard',
    groupSuites: true,
    useCompactStyle: true,
    useLegacyStyle: true,
    showOnlyFailed: false,
    suppressAll: false, // Suppress all messages (overrides other suppress settings)
    suppressFailed: false // Suppress failed messages
  }
}

function customLaunchers() {
  return {
    CustomChrome: {
      base: 'Chrome',
      flags: [
        '--disable-extensions',

        '--disable-web-security',
        '--disable-site-isolation-trials'
      ]
    },
    CustomHeadlessChrome: {
      base: 'ChromeHeadless',
      flags: [
        '--no-sandbox',
        '--disable-setuid-sandbox',

        '--disable-translate',
        '--remote-debugging-port=9222',

        '--disable-gpu',

        '--disable-web-security',
        '--disable-site-isolation-trials'
      ]
    }
  };
}

function adjustConfig(config) {
  console.log('Debug: Karma: process.env.CI: ', process.env.CI);

  if (process.env.HEROKU) {
    adjustConfigHeroku(config);
  }

  if (process.env.TRAVIS) {
    console.log('Debug: Karma: process.env.TRAVIS: ', process.env.TRAVIS);

    config.browsers = ['CustomHeadlessChrome'];
  }

  if (process.env.custom_appveyor) {
    console.log('Debug: Karma: process.env.APPVEYOR: ', process.env.APPVEYOR);
  }

  if (process.env.CIRCLECI) {
    console.log('Debug: Karma: process.env.CIRCLECI: ', process.env.CIRCLECI);
    console.log('Debug: Karma: process.env.CIRCLE_STAGE: ', process.env.CIRCLE_STAGE);

    config.browsers = ['CustomHeadlessChrome'];
  }

  config.singleRun = process.env.CI;
}

function adjustConfigHeroku(config) {
  console.log('Debug: Karma: process.env.HEROKU: ', process.env.HEROKU);

  config.browsers = ['CustomHeadlessChrome'];
  config.flags = [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--remote-debugging-port=9222'
  ];

  console.log('Debug: Karma: Setting process.env.CHROME_BIN: ', process.env.CHROME_BIN);
  process.env.CHROME_BIN = "/app/.apt/opt/google/chrome/chrome";
  console.log('Debug: Karma: process.env.CHROME_BIN: ', process.env.CHROME_BIN);

  console.log('Debug: Karma: Setting process.env.HTTP_PROXY: ', process.env.HTTP_PROXY);
  delete process.env.HTTP_PROXY;
  console.log('Debug: Karma: process.env.HTTP_PROXY: ', process.env.HTTP_PROXY);

  console.log('Debug: Karma: Setting process.env.HTTPS_PROXY: ', process.env.HTTPS_PROXY);
  delete process.env.HTTPS_PROXY;
  console.log('Debug: Karma: process.env.HTTPS_PROXY: ', process.env.HTTPS_PROXY);

  console.log('Debug: Karma: Setting process.env.NO_PROXY: ', process.env.NO_PROXY);
  process.env.NO_PROXY = "localhost, 0.0.0.0/4201, 0.0.0.0/9876";
  console.log('Debug: Karma: process.env.NO_PROXY: ', process.env.NO_PROXY);
}

function merge(obj1, obj2) {
  for (var attrname in obj2) {
    obj1[attrname] = obj2[attrname];
  }

  return obj1;
}
