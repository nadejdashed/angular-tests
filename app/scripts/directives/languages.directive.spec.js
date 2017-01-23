import appName from '../app.module';

describe('languagesDirective', () => {
	let suite;

	angular.mock.module.sharedInjector();

	beforeAll(angular.mock.module(appName, ($provide) => {
		var lang = 'en';
		suite = {};
		suite.i18nService = {
			setLanguage: (l) => { lang = l; },
			getLanguage: () => { return lang; }
		};

		$provide.value('i18nService', suite.i18nService);
	}));

	beforeAll(angular.mock.inject(($rootScope, $compile, $q) => {
		suite.i18nService.getLanguages = () => $q.resolve(['en', 'fr']);

		suite.scope = $rootScope.$new();
		suite.element = '<languages value="l"></languages>';
		suite.element = $compile(suite.element)(suite.scope);
		suite.scope.$digest();
	}));

	afterAll(() => {
		suite.element.remove();
		suite = null;
	});

	it('should contains all languages', () => {
		var isolateScope = suite.element.isolateScope();
		expect(isolateScope.languages).toEqual(['en', 'fr']);
	});

	it('should receive default language', () => {
		var isolateScope = suite.element.isolateScope();

		expect(isolateScope.selectedLanguage).toBe('en');
	});

	it('should not try to set language if it is empty', () => {
		var isolateScope = suite.element.isolateScope();

		isolateScope.selectedLanguage = undefined;
		suite.scope.$apply();
		expect(suite.i18nService.getLanguage()).toBe('en');
	});

	it('should have possibility to set language', () => {
		var isolateScope = suite.element.isolateScope();

		isolateScope.selectedLanguage = 'fr';
		suite.scope.$apply();
		expect(suite.i18nService.getLanguage()).toBe('fr');
		expect(suite.scope.l).toBe('fr');
	});
});