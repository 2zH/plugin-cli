const path = require('path')
const webpack = require('webpack')

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    // files: [
    //   'node_modules/babel-polyfill/dist/polyfill.js',
    //   'plugins/*/test/**/*.js',
    //   'node_modules/jquery/dist/jquery.js'
    //   //'node_modules/tether/dist/js/tether.js',
    // ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'packages/**/*.js': ['webpack', 'coverage'],
      'packages/*/test/**/*.spec.js': ['webpack']
    },

    // // optionally, configure the reporter
    // // text displays it within the console (alternative: text-summary)
    // // lcov creates a codecov compatible report
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html', dir: 'coverage' },
        { type: 'lcov' }
      ]
    },

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // coverage is from karma-coverage and provides Istanbul code coverage report
    reporters: ['mocha', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // Currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    // Which plugins to enable
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-coverage'
    ],
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: false,
    concurrency: Infinity
  });
};
