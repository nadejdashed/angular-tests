'use strict';

describe('itemsService', function () {
	var $httpBackend,
		itemsService;

	beforeEach(module('app'));
	beforeEach(module('mock'));

	beforeEach(inject(function ($injector, items) {
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', '/items').respond(items);

		itemsService = $injector.get('itemsService');
	}));

	afterEach(function () {
		// Verifies that all of the requests defined via the expect api were made.
		// If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.
		$httpBackend.verifyNoOutstandingExpectation();
		// Verifies that there are no outstanding requests that need to be flushed.
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should return items on the start', function () {
		var items;

		items = itemsService.getItems();
		expect(items).toBeDefined();
		expect(items.length).toBe(0);

		$httpBackend.expectGET('/items');
		$httpBackend.flush();

		items = itemsService.getItems();
		expect(items).toBeDefined();
		expect(items.length).toBe(2);
	});

	it('should not change items link after request', function () {
		var items = itemsService.getItems();

		$httpBackend.flush();
		expect(itemsService.getItems()).toBe(items);
	});
});