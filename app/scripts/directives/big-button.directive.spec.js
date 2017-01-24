import appName from '../app.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

// Work only with Chrome
describe('bigButtonDirective', () => {
	let suite;

	beforeEach(angular.mock.module(appName));

	beforeEach(angular.mock.inject(($rootScope, $compile, $document, $window) => {
		suite = {};

		suite.$window = $window;
		suite.$document = $document;
		suite.$document[0].body.style.height = '10000px';

		suite.scope = $rootScope.$new();

		suite.element = '<div big-button></div>';
		suite.element = $compile(suite.element)(suite.scope);

		suite.scope.$digest();
	}));

	afterEach(() => {
        suite.element.remove();
		suite = null;
	});

	function triggerEvent(elem){
		let event = suite.$document[0].createEvent('Event');
		event.initEvent('scroll');
		elem.dispatchEvent(event);
	}

	it('should increase button if scroll to end of the page', (done) => {
		suite.$document[0].body.scrollTop = 10000;
		triggerEvent(suite.$document[0], 'scroll');

		setTimeout(() => {
			expect(suite.scope.isBigButton).toBeTruthy();
			done();
		}, 0);
	});

	it('should increase button if scroll is not to the end of the page', (done) => {
		suite.$document[0].body.scrollTop = 1000;
		triggerEvent(suite.$document[0], 'scroll');

		setTimeout(() => {
			expect(suite.scope.isBigButton).toBeFalsy();
			done();
		}, 0);
	});

	it('should scroll up after click on the button', () => {
		suite.$document[0].body.scrollTop = 1000;
		triggerEvent(suite.$document[0], 'scroll');

		expect(suite.$document[0].body.scrollTop).toBe(1000);
		suite.scope.onClick();
		expect(suite.$document[0].body.scrollTop).toBe(0);
	});
});