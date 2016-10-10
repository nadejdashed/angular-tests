'use strict';

describe('advertisingDirective', function () {
	var element, scope, isolatedScope;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		element = '<div panel header="Temp"><div>Test</div></div>';
		element = $compile(element)(scope);
		isolatedScope = element.isolateScope();
		scope.$digest();
	}));

	it('should contain header with text Temp', function () {
		expect(isolatedScope.header).toBe('Temp');
		expect(element[0].querySelector('.panel-header').innerText).toEqual('Temp');
	});

	it('should contain body with text Test', function () {
		expect(element[0].querySelector('.panel-body').innerText).toEqual('Test');
	});
});