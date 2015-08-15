'use strict';

module.exports = function (karma) {
  karma.set({

    frameworks: ['jasmine'],

    files: [
      'tests/base.js',
      'tests/**/*Spec.js',
      'src/**/*.js'
    ],
    exclude: [
      'src/**/config.js',
      'src/**/index.js',
      'src/**/app.js'
    ],

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        //{ type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        //{ type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        //{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        //{ type: 'text', subdir: '.', file: 'text.txt' },
        //{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    },
    preprocessors: {
      'tests/base.js': ['webpack'],
      'tests/**/*Spec.js': ['webpack'],
      //'src/**/*.js': ['coverage']
      //'src/**/*.js': ['webpack']
    },

    browsers: ['PhantomJS'],

    logLevel: 'LOG_INFO',

    singleRun: true,
    autoWatch: true,

    colors: true
  });
};