import appName from '../app.module';

describe('i18nFilter', () => {
	let suite;

	beforeEach(angular.mock.module(appName, ($provide) => {
		suite = {};
		suite.i18nService = {
			getText: () => { }
		};
		spyOn(suite.i18nService, 'getText').and.returnValue('test');
		$provide.value('i18nService', suite.i18nService);
	}));

	beforeEach(angular.mock.inject(($filter) => {
		suite.i18n = $filter('i18n');
	}));

	afterEach(() => {
		suite = null;
	});

	it('should get text from the i18nService', () => {
		let result = suite.i18n('text', 'lang');

		expect(suite.i18nService.getText).toHaveBeenCalledWith('text', 'lang');
		expect(result).toBe('test');
	});
});


