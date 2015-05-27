// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',
	reporters: ['junit', 'coverage'],
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
	  'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
	  'http://www.parsecdn.com/js/parse-1.4.2.min.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
	singleRun: true,
	plugins: [
		'karma-chrome-launcher',
		'karma-firefox-launcher',
		'karma-jasmine',
		'karma-junit-reporter',
        'karma-coverage'
	],
	junitReporter: {
		outputFile: 'test_reports/junit/junit.xml',
		suite: 'unit'
	},
	preprocessors: {
		'app/js/**/*.js': ['coverage']
	},
	coverageReporter: {
		dir: 'test_reports/coverage/',            
		reporters: [
			{type: 'lcov', subdir: '.'},
			{type: 'cobertura', subdir: '.', file: 'cobertura.xml'}
		]
	}	
  });
};
