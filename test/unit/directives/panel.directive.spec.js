'use strict';

describe('advertisingDirective', function () {
	var suite;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, $compile) {
		suite = {};
		suite.scope = $rootScope.$new();
		suite.element = '<div panel header="Temp"><div>Test</div></div>';
		suite.element = $compile(suite.element)(suite.scope);
		suite.isolatedScope = suite.element.isolateScope();
		suite.scope.$digest();
	}));

	afterEach(function(){
		suite.element.remove();
		suite = null;
	});

	it('should contain header with text Temp', function () {
		expect(suite.isolatedScope.header).toBe('Temp');
		expect(suite.element[0].querySelector('.panel-header').innerText).toEqual('Temp');
	});

	it('should contain body with text Test', function () {
		expect(suite.element[0].querySelector('.panel-body').innerText).toEqual('Test');
	});
});