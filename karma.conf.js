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
        functions: 80
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
    },

    singleRun: false,
    restartOnFileChange: true,
    concurrency: Infinity,

    browserDisconnectTimeout: 60 * 1000, // default 2000
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10000

    browserDisconnectTolerance: 1, // default 0
    captureTimeout: 5 * 60 * 1000 //default 60000
  });

  if (process.env.HEROKU) {
    console.log('Debug: process.env.CI: ', process.env.CI);
    console.log('Debug: process.env.HEROKU: ', process.env.HEROKU);

    config.browsers = ['CustomHeadlessChrome'];
    config.flags = [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--remote-debugging-port=9222'
    ];
    config.singleRun = true;

    console.log('Debug: Setting process.env.CHROME_BIN: ', process.env.CHROME_BIN);
    process.env.CHROME_BIN = "/app/.apt/opt/google/chrome/chrome";
    console.log('Debug: process.env.CHROME_BIN: ', process.env.CHROME_BIN);

    console.log('Debug: Setting process.env.HTTP_PROXY: ', process.env.HTTP_PROXY);
    delete process.env.HTTP_PROXY;
    console.log('Debug: process.env.HTTP_PROXY: ', process.env.HTTP_PROXY);

    console.log('Debug: Setting process.env.HTTPS_PROXY: ', process.env.HTTPS_PROXY);
    delete process.env.HTTPS_PROXY;
    console.log('Debug: process.env.HTTPS_PROXY: ', process.env.HTTPS_PROXY);

    console.log('Debug: Setting process.env.NO_PROXY: ', process.env.NO_PROXY);
    process.env.NO_PROXY = "localhost, 0.0.0.0/4201, 0.0.0.0/9876";
    console.log('Debug: process.env.NO_PROXY: ', process.env.NO_PROXY);
  }

  if (process.env.TRAVIS) {
    console.log('Debug: process.env.CI: ', process.env.CI);
    console.log('Debug: process.env.TRAVIS: ', process.env.TRAVIS);

    config.browsers = ['CustomHeadlessChrome'];
    config.singleRun = true;
  }

  if (process.env.custom_appveyor) {
    console.log('Debug: process.env.CI: ', process.env.CI);
    console.log('Debug: process.env.APPVEYOR: ', process.env.APPVEYOR);

    config.singleRun = true;
  }

  if (process.env.CIRCLECI) {
    console.log('Debug: process.env.CI: ', process.env.CI);
    console.log('Debug: process.env.CIRCLECI: ', process.env.CIRCLECI);

    config.browsers = ['CustomHeadlessChrome'];
    config.singleRun = true;
  }

  if (process.env.singleRun) {
    console.log('Debug: process.env.CI: ', process.env.CI);

    config.singleRun = true;
  }
};
