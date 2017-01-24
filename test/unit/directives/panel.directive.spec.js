'use strict';

describe('panelDirective', function () {
	var suite;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, $compile) {
		suite = {};
		suite.scope = $rootScope.$new();

		suite.element = '<div panels></div>';
		suite.element = $compile(suite.element)(suite.scope);
		suite.panelsController = suite.element.controller('panels');
		spyOn(suite.panelsController, 'addPanel');

		var childElement = angular.element('<div panel header="Temp"><div>Test</div></div>')
		suite.element.append(childElement);
        childElement = $compile(childElement)(suite.element.scope());
		suite.isolatedScope = childElement.isolateScope();

		suite.scope.$digest();
	}));

	afterEach(function(){
		suite.element.remove();
		suite = null;
	});

	it('should add panel in list of panels', function () {
		expect(suite.panelsController.addPanel).toHaveBeenCalled();
	});

	it('should contain header with text Temp', function () {
		expect(suite.isolatedScope.header).toBe('Temp');
		expect(suite.element[0].querySelector('.panel-header').innerText).toEqual('Temp');
	});

	it('should contain body with text Test', function () {
		expect(suite.element[0].querySelector('.panel-body').innerText).toEqual('Test');
	});
});