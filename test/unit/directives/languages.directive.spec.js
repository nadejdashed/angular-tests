'use strict';

describe('languagesDirective', function () {
	var suite;

	beforeEach(module('app', function ($provide) {
		var lang = 'en';
		suite = {};
		suite.i18nService = {
			setLanguage: function(l) { lang = l; },
			getLanguage: function() { return lang; }
		};

		$provide.value('i18nService', suite.i18nService);
	}));

	beforeEach(inject(function ($rootScope, $compile, $q) {
		suite.i18nService.getLanguages = function () { return $q.resolve(['en', 'fr']); }

		suite.scope = $rootScope.$new();
		suite.element = '<languages value="l"></languages>';
		suite.element = $compile(suite.element)(suite.scope);
		suite.scope.$digest();
	}));

	afterEach(function(){
		suite.element.remove();
		suite = null;
	});

	it('should contains all languages', function () {
		var isolateScope = suite.element.isolateScope();
		expect(isolateScope.languages).toEqual(['en', 'fr']);
	});

	it('should receive default language', function () {
		var isolateScope = suite.element.isolateScope();

		expect(isolateScope.selectedLanguage).toBe('en');
	});

	it('should not try to set language if it is empty', function () {
		var isolateScope = suite.element.isolateScope();

		isolateScope.selectedLanguage = undefined;
		suite.scope.$apply();
		expect(suite.i18nService.getLanguage()).toBe('en');
	});

	it('should have possibility to set language', function () {
		var isolateScope = suite.element.isolateScope();

		isolateScope.selectedLanguage = 'fr';
		suite.scope.$apply();
		expect(suite.i18nService.getLanguage()).toBe('fr');
		expect(suite.scope.l).toBe('fr');
	});
});