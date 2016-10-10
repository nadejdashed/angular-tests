'use strict';

describe('appController', function () {
	var suite = null;

	beforeEach(module('app'));

	beforeEach(inject(function ($rootScope, $controller) {
		var items,
			itemsService;

		items = [{
			done: false,
			text: 'Write test'
		}, {
			done: false,
			text: 'Finish project'
		}];

		itemsService = {
			getItems: function(){
				return items;
			}
		};

		suite = {};
		suite.$scope = $rootScope.$new();
		suite.appController = $controller('appController', {
			itemsService: itemsService,
			$scope: suite.$scope
		});
		suite.$scope.$apply();
	}));

	afterEach(function(){
		suite = null;
	});

	it('should add new item to list with false done status', function () {
		var length = suite.$scope.items.length,
			text = 'New task';

		suite.$scope.newItem = text;
		suite.$scope.add();

		expect(suite.$scope.items.length).toBe(length + 1); // compares with ===
		expect(suite.$scope.items[length].text).toEqual(text); // simple literals and variables and for objects
		expect(suite.$scope.items[length].done).toBeFalsy();
	});

	it('should clear text field after adding new item', function () {
		suite.$scope.newItem = 'New task';
		suite.$scope.add();

		expect(suite.$scope.newItem).toBe('');
	});

	it('should remove item from list', function () {
		var ind = 0,
			length = suite.$scope.items.length,
			item = suite.$scope.items[ind];

		suite.$scope.remove(ind);

		expect(suite.$scope.items.length).toBe(length - 1);
		expect(suite.$scope.items[ind]).not.toBe(item);
	});

	it('should set done to not completed item', function () {
		var ind = 0;

		suite.$scope.complete(ind);
		expect(suite.$scope.items[ind].done).toBeTruthy();
	});

	it('should not change item status if task already completed', function () {
		var ind = 0;

		suite.$scope.complete(ind);
		expect(suite.$scope.items[ind].done).toBeTruthy();
		suite.$scope.complete(ind);
		expect(suite.$scope.items[ind].done).toBeTruthy();
	});

	it('should remove all done tasks', function () {
		suite.$scope.items[0].done = true;
		suite.$scope.items.push({done: true});
		expect(suite.$scope.items.length).toBe(3);

		suite.$scope.reset();
		expect(suite.$scope.items.length).toBe(1);
		expect(suite.$scope.items[0].done).toBeFalsy();
	});
});