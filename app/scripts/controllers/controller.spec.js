import appName from '../app.module';

describe('appController', () => {
	let suite = null;

	beforeEach(angular.mock.module(appName));

	beforeEach(angular.mock.inject(($rootScope, $controller) => {
		let items,
			itemsService;

		items = [{
			done: false,
			text: 'Write test'
		}, {
			done: false,
			text: 'Finish project'
		}];

		itemsService = {
			getItems: () => items
		};

		suite = {};
		suite.$scope = $rootScope.$new();
		suite.appController = $controller('appController', {
			itemsService: itemsService,
			$scope: suite.$scope
		});
		suite.$scope.$apply();
	}));

	afterEach(() => {
		suite = null;
	});

	it('should add new item to list with false done status', () => {
		let length = suite.appController.items.length,
			text = 'New task';

		suite.appController.newItem = text;
		suite.appController.add();

		expect(suite.appController.items.length).toBe(length + 1); // compares with ===
		expect(suite.appController.items[length].text).toEqual(text); // simple literals and variables and for objects
		expect(suite.appController.items[length].done).toBeFalsy();
	});

	it('should clear text field after adding new item', () => {
		suite.appController.newItem = 'New task';
		suite.appController.add();

		expect(suite.appController.newItem).toBe('');
	});

	it('should remove item from list', () => {
		let ind = 0,
			length = suite.appController.items.length,
			item = suite.appController.items[ind];

		suite.appController.remove(ind);

		expect(suite.appController.items.length).toBe(length - 1);
		expect(suite.appController.items[ind]).not.toBe(item);
	});

	it('should set done to not completed item', () => {
		let ind = 0;

		suite.appController.complete(ind);
		expect(suite.appController.items[ind].done).toBeTruthy();
	});

	it('should not change item status if task already completed', () => {
		let ind = 0;

		suite.appController.complete(ind);
		expect(suite.appController.items[ind].done).toBeTruthy();
		suite.appController.complete(ind);
		expect(suite.appController.items[ind].done).toBeTruthy();
	});

	it('should remove all done tasks', () => {
		suite.appController.items[0].done = true;
		suite.appController.items.push({done: true});
		expect(suite.appController.items.length).toBe(3);

		suite.appController.reset();
		expect(suite.appController.items.length).toBe(1);
		expect(suite.appController.items[0].done).toBeFalsy();
	});
});