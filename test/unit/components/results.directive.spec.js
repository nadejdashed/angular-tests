'use strict';

describe('resultsDirective', function () {
	var $componentController,
		bindings,
		ctrl;

	beforeEach(module('app'));

	beforeEach(inject(function (_$componentController_) {
		$componentController = _$componentController_;
		bindings = {done:0, clearFunction: function(){}};
		spyOn(bindings, 'clearFunction');
	}));

	it('should not call clear function if no tasks are completed', function () {
		ctrl = $componentController('results', null, bindings);
		ctrl.reset();
		expect(bindings.clearFunction).not.toHaveBeenCalled();
	});

	it('should call clear function if done tasks exist', function () {
		bindings.done = 4;
		ctrl = $componentController('results', null, bindings);
		ctrl.reset();
		expect(bindings.clearFunction).toHaveBeenCalled();
	});
});