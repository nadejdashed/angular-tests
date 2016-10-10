'use strict';

describe('advertisingDirective', function () {
	var suite;

	beforeEach(module('app', function($provide){
		$provide.value('i18nFilter', function(){ return 'Adv'; } );
	}));

	beforeEach(inject(function ($rootScope, $compile, _$timeout_, $filter) {
		suite = {};
		suite.scope = $rootScope.$new();
		suite.scope.index = 1;

		suite.element = '<div><div advertising>{{index}}</div></div>';
		suite.element = $compile(suite.element)(suite.scope);

		suite.scope.$digest();
		suite.$timeout = _$timeout_;
	}));

	afterEach(function(){
		suite.element.remove();
		suite = null;
	});

	it('should have advertising at the beginning', function () {
		expect(suite.element.contents()[1].innerText).toEqual('Adv');
	});

	it('should have advertising till 2nd second', function () {
		suite.$timeout.flush(1999);
		expect(suite.element.contents()[1].innerText).toEqual('Adv');
	});

	it('should  have initial text after 2 seconds', function () {
		suite.$timeout.flush(2000);
		expect(suite.element.contents()[1].innerText).toEqual('1');
	});
});