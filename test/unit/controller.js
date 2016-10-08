'use strict';

describe('appController', function () {
	var $scope,
		appController;

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

		$scope = $rootScope.$new();
		appController = $controller('appController', {
			itemsService: itemsService,
			$scope: $scope
		});
		$scope.$apply();
	}));

	it('should add new item to list', function () {
		var length = $scope.items.length,
			text = 'New task';

		$scope.newItem = text;
		$scope.add();

		expect($scope.items.length).toBe(length + 1); // compares with ===
		expect($scope.items[length].text).toEqual(text); // simple literals and variables and for objects
		expect($scope.items[length].done).toBeFalsy();
	});

	it('should remove item from list', function () {
		var ind = 0,
			length = $scope.items.length,
			item = $scope.items[ind];

		$scope.remove(ind);

		expect($scope.items.length).toBe(length - 1);
		expect($scope.items[ind]).not.toBe(item);
	});

	it('should set done to not completed item', function () {
		var ind = 0;

		$scope.complete(ind);
		expect($scope.items[ind].done).toBeTruthy();
	});

	it('should not change item status if task already completed', function () {
		var ind = 0;

		$scope.complete(ind);
		expect($scope.items[ind].done).toBeTruthy();
		$scope.complete(ind);
		expect($scope.items[ind].done).toBeTruthy();
	});

	it('should remove all done tasks', function () {
		$scope.items[0].done = true;
		$scope.items.push({done: true});
		expect($scope.items.length).toBe(3);

		$scope.reset();
		expect($scope.items.length).toBe(1);
		expect($scope.items[0].done).toBeFalsy();
	});
});