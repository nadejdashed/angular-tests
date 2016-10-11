'use strict';

describe('resultsDirective', function () {
	var suite = {};

	module.sharedInjector();
	beforeAll(module('app'));

	beforeAll(inject(function (_$componentController_) {
		suite.$componentController = _$componentController_;
		suite.bindings = {clearFunction: function(){}};
		spyOn(suite.bindings, 'clearFunction');
	}));

	afterAll(function(){
		suite = null;
	});

	it('should not call clear function if no tasks are completed', function () {
		suite.bindings.done = 0;
		var ctrl = suite.$componentController('results', null, suite.bindings);
		ctrl.reset();
		expect(suite.bindings.clearFunction).not.toHaveBeenCalled();
	});

	it('should call clear function if done tasks exist', function () {
		suite.bindings.done = 4;
		var ctrl = suite.$componentController('results', null, suite.bindings);
		ctrl.reset();
		expect(suite.bindings.clearFunction).toHaveBeenCalled();
	});
});