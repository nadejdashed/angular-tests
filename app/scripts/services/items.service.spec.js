import appName from '../app.module';

describe('itemsService', () => {
	var suite;

	beforeEach(angular.mock.module(appName));

	beforeEach(angular.mock.inject(($injector) => {
		suite = {};
		suite.$httpBackend = $injector.get('$httpBackend');
		suite.$httpBackend.when('GET', '/items').respond([{
			done: false,
			text: 'Write test'
		},
		{
			done: false,
			text: 'Finish project'
		}]);

		suite.itemsService = $injector.get('itemsService');
	}));

	afterEach(() => {
		// Verifies that all of the requests defined via the expect api were made.
		// If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.
		suite.$httpBackend.verifyNoOutstandingExpectation();
		// Verifies that there are no outstanding requests that need to be flushed.
		suite.$httpBackend.verifyNoOutstandingRequest();

		suite = null;
	});

	it('should return items on the start', () => {
		var items;

		items = suite.itemsService.getItems();
		expect(items).toBeDefined();
		expect(items.length).toBe(0);

		suite.$httpBackend.expectGET('/items');
		suite.$httpBackend.flush();

		items = suite.itemsService.getItems();
		expect(items).toBeDefined();
		expect(items.length).toBe(2);
	});

	it('should not change items link after request', () => {
		var items = suite.itemsService.getItems();

		suite.$httpBackend.flush();
		expect(suite.itemsService.getItems()).toBe(items);
	});
});