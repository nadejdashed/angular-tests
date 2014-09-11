'use strict';

describe('i18nService', function () {
	var $httpBackend,
		mock,
		i18nService;

	beforeEach(module('app'));
	beforeEach(module('mock'));

	beforeEach(inject(function ($injector, translations) {
		$httpBackend = $injector.get('$httpBackend');
		mock = translations;
		$httpBackend.when('GET', '/translations.json').respond(mock);

		i18nService = $injector.get('i18nService');
	}));

	afterEach(function () {
		// Verifies that all of the requests defined via the expect api were made.
		// If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.
		$httpBackend.verifyNoOutstandingExpectation();
		// Verifies that there are no outstanding requests that need to be flushed.
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should return languages on the start', function () {
		var languages;

		languages = i18nService.getLanguages();
		expect(languages).toBeDefined();
		expect(languages.length).toBe(0);

		$httpBackend.flush();

		languages = i18nService.getLanguages();
		expect(languages).toBeDefined();
		expect(languages.length).toBe(2);
	});

	it('should return text for necessary language', function () {
		var language = Object.keys(mock)[0],
			key = Object.keys(mock[language])[0],
			text = mock[language][key];

		$httpBackend.flush();
		expect(i18nService.getText(language, key)).toBe(text);
	});

	it('should return empty string if language does not exist', function () {
		var language = Object.keys(mock)[0],
			key = Object.keys(mock[language])[0];

		$httpBackend.flush();
		expect(i18nService.getText('temp', key)).toBe('');
	});

	it('should return empty string if key does not exist', function () {
		var language = Object.keys(mock)[0];

		$httpBackend.flush();
		expect(i18nService.getText(language, 'temp')).toBe('');
	});
});