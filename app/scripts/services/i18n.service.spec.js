import appName from '../app.module';

describe('i18nService', () => {
	let suite;

	beforeEach(angular.mock.module(appName));

	beforeEach(angular.mock.inject(($injector) => {
		suite = {};
		suite.$httpBackend = $injector.get('$httpBackend');
		suite.$httpBackend.when('GET', '/translations.json').respond({
			en: {
				'Test': 'TestEN'
			},
			ru: {
				'Test': 'TestRU'
			}
		});

		suite.i18nService = $injector.get('i18nService');
	}));

	afterEach(() => {
		// Verifies that all of the requests defined via the expect api were made.
		// If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.
		suite.$httpBackend.verifyNoOutstandingExpectation();
		// Verifies that there are no outstanding requests that need to be flushed.
		suite.$httpBackend.verifyNoOutstandingRequest();

		suite = null;
	});

	function getLanguages(){
		suite.languages = suite.i18nService.getLanguages();
		suite.$httpBackend.flush();
	}

	it('should return promise with languages when try receive languages', () => {
		let languages,
			success;

		success = jasmine.createSpy('success');
		suite.i18nService.getLanguages().then(success);

		suite.$httpBackend.flush();
		expect(success).toHaveBeenCalledWith(['en', 'ru']);
	});

	it('should set first language as default after request', () => {
		let languages;

		expect(suite.i18nService.getLanguage()).not.toBeDefined();

		languages = suite.i18nService.getLanguages();
		suite.$httpBackend.flush();

		expect(suite.i18nService.getLanguage()).toBe('en');
	});

	it('should return text for default language if language is not changed', () => {
		getLanguages();
		expect(suite.i18nService.getText('Test')).toBe('TestEN');
	});

	it('should return text for changed language if another language was set', () => {
		getLanguages();
		suite.i18nService.setLanguage('ru');
		expect(suite.i18nService.getText('Test')).toBe('TestRU');
	});

	it('should not change language if language is not defined or not exist in languages list', () => {
		getLanguages();
		suite.i18nService.setLanguage('ru');
		suite.i18nService.setLanguage('fr');
		suite.i18nService.setLanguage();
		expect(suite.i18nService.getLanguage()).toBe('ru');
	});

	it('should not change language if language is not exist in translation list', () => {
		getLanguages();
		suite.i18nService.setLanguage('fr');
		expect(suite.i18nService.getLanguage()).toBe('en');
	});

	it('should return empty string if key does not exist', () => {
		getLanguages();
		expect(suite.i18nService.getText('temp')).toBe('');
	});
});