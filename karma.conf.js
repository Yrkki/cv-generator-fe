// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-htmlfile-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 60,
        functions: 75
      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml', 'html'],
    jasmineHtmlReporter: {
      outputFile: 'coverage/jasmine-unit-tests.html',
      pageTitle: 'CV Generator Unit Tests',
      subPageTitle: 'Frontend Dashboard',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
      showOnlyFailed: false,
      suppressAll: false, // Suppress all messages (overrides other suppress settings)
      suppressFailed: false // Suppress failed messages
    },
    htmlReporter: {
      outputFile: 'coverage/unit-tests.html',
      pageTitle: 'CV Generator Unit Tests',
      subPageTitle: 'Frontend Dashboard',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
      showOnlyFailed: false,
      suppressAll: false, // Suppress all messages (overrides other suppress settings)
      suppressFailed: false // Suppress failed messages
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['CustomChrome'],

    customLaunchers: {
      CustomChrome: {
        base: 'Chrome',
        flags: [
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
          '--disable-extensions',
          '--remote-debugging-port=9222',

          '--disable-gpu',

          '--disable-web-security',
          '--disable-site-isolation-trials'
        ]
      }
    },

    singleRun: false,
    restartOnFileChange: true,
    concurrency: Infinity,

    browserDisconnectTimeout: 60 * 1000, // default 2000
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10000

    browserDisconnectTolerance: 1, // default 0
    captureTimeout: 5 * 60 * 1000 //default 60000
  });

  if (process.env.TRAVIS) {
    config.browsers = ['CustomHeadlessChrome'];
    config.singleRun = true;
  }

  if (process.env.HEROKU) {
    config.browsers = ['CustomHeadlessChrome'];
    config.singleRun = true;
  }

  if (process.env.custom_appveyor) {
    config.singleRun = true;
  }

  if (process.env.singleRun) {
    config.singleRun = true;
  }
};
