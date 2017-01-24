let itemsService;

class AppController {
	constructor(__itemsService__) {
		itemsService = __itemsService__;

		this.items = itemsService.getItems();
		this.newItem = '';
	}
	add () {
		let item = {
			done: false,
			text: this.newItem
		};

		this.items.push(item);
		this.newItem = '';
	}
	remove (ind) {
		this.items.splice(ind, 1);
	}
	complete (ind) {
		this.items[ind].done = true;
	}
	reset () {
		let i = this.items.length;
		while( i-- ) {
			if(this.items[i].done) {
				this.items.splice(i, 1);
			}
		}
	}
}

AppController.$inject = ['itemsService'];

export default AppController;