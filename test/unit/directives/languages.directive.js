'use strict';

describe('languagesDirective', function () {
	var element, scope,
		i18nService;

	beforeEach(module('app', function ($provide) {
		i18nService = {
			getLanguages: function () {
			}
		};
		spyOn(i18nService, 'getLanguages').andReturn(['en', 'fr']);
		$provide.value('i18nService', i18nService);
	}));

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		element = '<languages value="l"></languages>';
		element = $compile(element)(scope);
		scope.$digest();
	}));

	it('should contains all languages', function () {
		var isolateScope = element.isolateScope();

		expect(i18nService.getLanguages).toHaveBeenCalled();
		expect(isolateScope.languages).toEqual(['en', 'fr']);
	});

	it('should english be default language', function () {
		var isolateScope = element.isolateScope();

		expect(isolateScope.selectedLanguage).toBe('en');
	});

	it('should have possibility to set language', function () {
		var isolateScope = element.isolateScope();

		scope.l = 'fr';
		scope.$apply();
		expect(isolateScope.selectedLanguage).toBe('fr');
	});
});