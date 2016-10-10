'use strict';

describe('resultsDirective', function () {
	var suite = null;

	beforeEach(module('app'));

	beforeEach(inject(function (_$componentController_) {
		suite = {};
		suite.$componentController = _$componentController_;
		suite.bindings = {done:0, clearFunction: function(){}};
		spyOn(suite.bindings, 'clearFunction');
	}));

	afterEach(function(){
		suite = null;
	});

	it('should not call clear function if no tasks are completed', function () {
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