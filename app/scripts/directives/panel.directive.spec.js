import appName from '../app.module';

describe('panelDirective', () => {
	let suite;

	beforeEach(angular.mock.module(appName));

	beforeEach(angular.mock.inject(($rootScope, $compile) => {
        suite = {};
		suite.scope = $rootScope.$new();

		suite.element = '<div panels></div>';
		suite.element = $compile(suite.element)(suite.scope);
		suite.panelsController = suite.element.controller('panels');
		spyOn(suite.panelsController, 'addPanel');

        let childElement = angular.element('<div panel header="Temp"><div>Test</div></div>');
        suite.element.append(childElement);
        childElement = $compile(childElement)(suite.element.scope());
        suite.isolatedScope = childElement.isolateScope();

		suite.scope.$digest();
	}));

	afterEach(() => {
		suite.element.remove();
		suite = null;
	});

	it('should add panel in list of panels', () => {
		expect(suite.panelsController.addPanel).toHaveBeenCalled();
	});

	it('should contain header with text Temp', () => {
		expect(suite.isolatedScope.header).toBe('Temp');
		expect(suite.element[0].querySelector('.panel-header').innerText).toEqual('Temp');
	});

	it('should contain body with text Test', () => {
		expect(suite.element[0].querySelector('.panel-body').innerText).toEqual('Test');
	});
});