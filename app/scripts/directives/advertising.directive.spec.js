import appName from '../app.module';

describe('advertisingDirective', () => {
	let suite;

	beforeEach(angular.mock.module(appName, ($provide) => {
		$provide.value('i18nFilter', () => 'Adv' );
	}));

	beforeEach(angular.mock.inject(($rootScope, $compile, _$timeout_, $filter) => {
		suite = {};
		suite.scope = $rootScope.$new();
		suite.scope.index = 1;

		suite.element = '<div><div advertising>{{index}}</div></div>';
		suite.element = $compile(suite.element)(suite.scope);

		suite.scope.$digest();
		suite.$timeout = _$timeout_;
	}));

	afterEach(() => {
		suite.element.remove();
		suite = null;
	});

	it('should have advertising at the beginning', () => {
		expect(suite.element.contents()[1].innerText).toEqual('Adv');
	});

	it('should have advertising till 2nd second', () => {
		suite.$timeout.flush(1999);
		expect(suite.element.contents()[1].innerText).toEqual('Adv');
	});

	it('should  have initial text after 2 seconds', () => {
		suite.$timeout.flush(2000);
		expect(suite.element.contents()[1].innerText).toEqual('1');
	});
});