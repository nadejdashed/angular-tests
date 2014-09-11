'use strict';

angular.module('app').service('itemsService', ['$http', function ($http) {
	var items = [];

	$http.get('/items').then(function (response) {
		Array.prototype.push.apply(items, response.data);
	});

	return {
		getItems: function () {
			return items;
		}
	};
}]);