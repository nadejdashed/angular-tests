'use strict';

var ItemsService = ['$http', function ($http) {
	var promise,
		items = [];

	return {
		getItems: function () {
			promise || requestItems();
			return items;
		}
	};

	function requestItems(){
		promise = $http.get('/items').then(function (response) {
			Array.prototype.push.apply(items, response.data);
		});
	}
}];

export default ItemsService;
