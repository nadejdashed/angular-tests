'use strict';

angular.module('app').controller('appController', ['$scope', 'itemsService', function ($scope, itemsService) {
	$scope.items = itemsService.getItems();
	$scope.newItem = '';

	$scope.add = function () {
		var item = {
			done: false,
			text: $scope.newItem
		};

		$scope.items.push(item);
		$scope.newItem = '';
	};

	$scope.remove = function (ind) {
		$scope.items.splice(ind, 1);
	};

	$scope.complete = function (ind) {
		$scope.items[ind].done = true;
	};
}]);