'use strict';

describe('advertisingDirective', function () {
	var element, scope, contents,
		$timeout;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, $compile, _$timeout_) {
		scope = $rootScope.$new();
		scope.index = 1;

		element = '<div><div advertising>{{index}}</div></div>';
		element = $compile(element)(scope);

		scope.$digest();
		$timeout = _$timeout_;
	}));

	it('should not have initial text at the beginning', function () {
		expect(element.contents()[1].innerText).not.toEqual('1');

		$timeout.flush(1999);
		expect(element.contents()[1].innerText).not.toEqual('1');
	});

	it('should  have initial text after 2 seconds', function () {
		$timeout.flush(2000);
		expect(element.contents()[1].innerText).toEqual('1');
	});
});