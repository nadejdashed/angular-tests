'use strict';

let $http,
	promise,
	items = [];

let requestItems = () => {
	promise = $http.get('/items').then((response) => {
		items.push(...response.data);
	});
};

class ItemsService {
	constructor(__$http__) {
		$http = __$http__;
		promise = undefined;
		items = [];
	}
	getItems () {
		promise || requestItems();
		return items;
	}
}

ItemsService.$inject = ['$http'];

export default ItemsService;
