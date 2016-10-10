'use strict';

describe('advertisingDirective', function () {
	var element, scope, contents,
		$timeout;

	beforeEach(module('app', function($provide){
		$provide.value('i18nFilter', function(){ return 'Adv'; } );
	}));

	beforeEach(inject(function ($rootScope, $compile, _$timeout_, $filter) {
		scope = $rootScope.$new();
		scope.index = 1;

		element = '<div><div advertising>{{index}}</div></div>';
		element = $compile(element)(scope);

		scope.$digest();
		$timeout = _$timeout_;
	}));

	it('should have advertising at the beginning', function () {
		expect(element.contents()[1].innerText).toEqual('Adv');
	});

	it('should have advertising till 2nd second', function () {
		$timeout.flush(1999);
		expect(element.contents()[1].innerText).toEqual('Adv');
	});

	it('should  have initial text after 2 seconds', function () {
		$timeout.flush(2000);
		expect(element.contents()[1].innerText).toEqual('1');
	});
});