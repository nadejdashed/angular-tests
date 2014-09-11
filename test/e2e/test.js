'use strict';

describe('E2E', function () {
	var done = element(by.id('done')),
		items = element.all(by.css('ul li')),
		newItem = element(by.model('newItem'));

	beforeEach(function () {
		browser.get('http://localhost:63342/angular-tests/app/index.html');
	});

	it('should have a title', function () {
		expect(browser.getTitle()).toEqual('Angular testing');
	});

	it('should add new item', function () {
		var button = element(by.css('button'));

		newItem.sendKeys('New item !!!!!');
		button.click();
		expect(items.count()).toEqual(3);
	});
});