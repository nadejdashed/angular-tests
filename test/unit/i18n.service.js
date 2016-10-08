'use strict';

describe('i18nService', function () {
	var $httpBackend,
		i18nService,
		languages;

	beforeEach(module('app'));

	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', '/translations.json').respond({
			en: {
				'Test': 'TestEN'
			},
			ru: {
				'Test': 'TestRU'
			}
		});

		i18nService = $injector.get('i18nService');
	}));

	afterEach(function () {
		// Verifies that all of the requests defined via the expect api were made.
		// If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.
		$httpBackend.verifyNoOutstandingExpectation();
		// Verifies that there are no outstanding requests that need to be flushed.
		$httpBackend.verifyNoOutstandingRequest();
	});

	function getLanguages(){
		languages = i18nService.getLanguages();
		$httpBackend.flush();
	}

	it('should return promise with languages when try receive languages', function () {
		var languages,
			success;

		success = jasmine.createSpy('success');
		i18nService.getLanguages().then(success);

		$httpBackend.flush();
		expect(success).toHaveBeenCalledWith(['en', 'ru']);
	});

	it('should set first language as default after request', function () {
		var languages;

		expect(i18nService.getLanguage()).not.toBeDefined();

		languages = i18nService.getLanguages();
		$httpBackend.flush();

		expect(i18nService.getLanguage()).toBe('en');
	});

	it('should return text for default language if language is not changed', function () {
		getLanguages();
		expect(i18nService.getText('Test')).toBe('TestEN');
	});

	it('should return text for changed language if another language was set', function () {
		getLanguages();
		i18nService.setLanguage('ru');
		expect(i18nService.getText('Test')).toBe('TestRU');
	});

	it('should not change language if language is not defined or not exist in languages list', function () {
		getLanguages();
		i18nService.setLanguage('ru');
		i18nService.setLanguage('fr');
		i18nService.setLanguage();
		expect(i18nService.getLanguage()).toBe('ru');
	});

	it('should not change language if language is not exist in translation list', function () {
		getLanguages();
		i18nService.setLanguage('fr');
		expect(i18nService.getLanguage()).toBe('en');
	});

	it('should return empty string if key does not exist', function () {
		getLanguages();
		expect(i18nService.getText('temp')).toBe('');
	});
});