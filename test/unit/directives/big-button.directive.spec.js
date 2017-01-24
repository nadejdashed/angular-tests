'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

// Work only in Chrome
xdescribe('bigButtonDirective', function () {
	var suite;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, $compile, $document, $window) {
		suite = {};

		suite.$window = $window;
		suite.$document = $document;
		suite.$document[0].body.style.height = '10000px';

		suite.scope = $rootScope.$new();

		suite.element = '<div big-button></div>';
		suite.element = $compile(suite.element)(suite.scope);

		suite.scope.$digest();
	}));

	afterEach(function(){
		suite.element.remove();
		suite = null;
	});

	function triggerEvent(elem){
		var event = document.createEvent('Event');
		event.initEvent('scroll');
		elem.dispatchEvent(event);
	}

	it('should increase button if scroll to end of the page', function (done) {
		suite.$document[0].body.scrollTop = 10000;
		triggerEvent(suite.$document[0].documentElement, 'scroll');

		setTimeout(function() {
			expect(suite.scope.isBigButton).toBeTruthy();
			done();
		}, 0);
	});

	it('should increase button if scroll is not to the end of the page', function (done) {
		suite.$document[0].body.scrollTop = 1000;
		triggerEvent(suite.$document[0].documentElement, 'scroll');

		setTimeout(function() {
			expect(suite.scope.isBigButton).toBeFalsy();
			done();
		}, 0);
	});

	it('should scroll up after click on the button', function () {
		suite.$document[0].body.scrollTop = 1000;
		triggerEvent(suite.$document[0].documentElement, 'scroll');

		expect(suite.$document[0].body.scrollTop).toBe(1000);
		suite.scope.onClick();
		expect(suite.$document[0].body.scrollTop).toBe(0);
	});
});