'use strict';

describe('languagesDirective', function () {
	var element, scope,
		i18nService;

	beforeEach(module('app', function ($provide) {
		var lang = 'en';
		i18nService = {
			setLanguage: function(l) { lang = l; },
			getLanguage: function() { return lang; }
		};

		$provide.value('i18nService', i18nService);
	}));

	beforeEach(inject(function ($rootScope, $compile, $q) {
		i18nService.getLanguages = function () { return $q.resolve(['en', 'fr']); }

		scope = $rootScope.$new();
		element = '<languages value="l"></languages>';
		element = $compile(element)(scope);
		scope.$digest();
	}));

	it('should contains all languages', function () {
		var isolateScope = element.isolateScope();
		expect(isolateScope.languages).toEqual(['en', 'fr']);
	});

	it('should receive default language', function () {
		var isolateScope = element.isolateScope();

		expect(isolateScope.selectedLanguage).toBe('en');
	});

	it('should not try to set language if it is empty', function () {
		var isolateScope = element.isolateScope();

		isolateScope.selectedLanguage = undefined;
		scope.$apply();
		expect(i18nService.getLanguage()).toBe('en');
	});

	it('should have possibility to set language', function () {
		var isolateScope = element.isolateScope();

		isolateScope.selectedLanguage = 'fr';
		scope.$apply();
		expect(i18nService.getLanguage()).toBe('fr');
		expect(scope.l).toBe('fr');
	});
});