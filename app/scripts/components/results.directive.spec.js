import appName from '../app.module';

describe('resultsDirective', () => {
	let suite = {};

	angular.mock.module.sharedInjector();
	beforeAll(angular.mock.module(appName));

	beforeAll(angular.mock.inject(($componentController, $rootScope) => {
		suite.$componentController = $componentController;
		suite.bindings = {clearFunction: () => {}};
		spyOn(suite.bindings, 'clearFunction');
	}));

	afterAll(() => {
		suite = null;
	});

	it('should not call clear function if no tasks are completed', () => {
		suite.bindings.done = 0;
		let ctrl = suite.$componentController('results', null, suite.bindings);
		ctrl.reset();
		expect(suite.bindings.clearFunction).not.toHaveBeenCalled();
	});

	it('should call clear function if done tasks exist', () => {
		suite.bindings.done = 4;
		let ctrl = suite.$componentController('results', null, suite.bindings);
		ctrl.reset();
		expect(suite.bindings.clearFunction).toHaveBeenCalled();
	});
});