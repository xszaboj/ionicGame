// Karma configuration
// Generated on Wed Nov 05 2014 22:56:07 GMT+0100 (Střední Evropa (běžný čas))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/lib/jquery-2.1.1.min.js',
      'lib/angular/angular.js',
      'lib/angular-cache/dist/angular-cache.min.js',
      'lib/ionic/js/ionic-angular.js',
      'test/lib/angular-mocks.js',
      'test/lib/sinon-1.11.0.js',
      'js/*.js',
      'js/Services/UtilService.js',
      'js/Services/GameService.js',
      'js/Services/TeamsService.js',
      'js/Services/ResultsService.js',
      'js/Controllers/*.js',
      'test/myTest.js',
      'test/TeamsTest.js',
      'test/GameTest.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
