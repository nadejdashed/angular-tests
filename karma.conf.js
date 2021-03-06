// Karma configuration
// Generated on Wed Sep 10 2014 20:42:13 GMT+0300 (Kaliningrad Standard Time)

module.exports = function (config) {

	var sourcePreprocessors = 'coverage';
	function isDebug(argument) {
		return argument === '--debug';
	}
	if (process.argv.some(isDebug)) {
		sourcePreprocessors = [];
	}

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'app/resources/angular.js',
			'app/resources/angular-mocks.js',
			'app/scripts/**/*.module.js',
			'app/scripts/**/*.js',
			'test/unit/**/*.js',
			'app/templates/**/*.html'
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'app/scripts/**/*.js': sourcePreprocessors,
			'app/templates/**/*.html': ['ng-html2js']
		},


		ngHtml2JsPreprocessor: {
			stripPrefix: 'app',
			moduleName: 'templates'
		},


		// list of files to exclude
		exclude: [
		],


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],


		coverageReporter: {
		  // specify a common output directory
		  dir: 'coverage',
		  reporters: [
			// reporters not supporting the `file` property
			{ type: 'html', subdir: 'report-html' },
			{ type: 'lcov', subdir: 'report-lcov' }
		  ]
		},
	
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
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
