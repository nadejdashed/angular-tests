'use strict';

describe('i18nFilter', function () {
	var suite;

	beforeEach(module('app', function ($provide) {
		suite = {};
		suite.i18nService = {
			getText: function () {
			}
		};
		spyOn(suite.i18nService, 'getText').andReturn('test');
		$provide.value('i18nService', suite.i18nService);
	}));

	beforeEach(inject(function ($filter) {
		suite.i18n = $filter('i18n');
	}));

	afterEach(function(){
		suite = null;
	});

	it('should get text from the i18nService', function () {
		var result = suite.i18n('text', 'lang');

		expect(suite.i18nService.getText).toHaveBeenCalledWith('text', 'lang');
		expect(result).toBe('test');
	});
});