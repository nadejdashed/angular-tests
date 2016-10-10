'use strict';

describe('i18nFilter', function () {
	var i18n,
		i18nService;

	beforeEach(module('app', function ($provide) {
		i18nService = {
			getText: function () {
			}
		};
		spyOn(i18nService, 'getText').andReturn('test');
		$provide.value('i18nService', i18nService);
	}));

	beforeEach(inject(function ($filter) {
		i18n = $filter('i18n');
	}));

	it('should get text from the i18nService', function () {
		var result = i18n('text', 'lang');

		expect(i18nService.getText).toHaveBeenCalledWith('text', 'lang');
		expect(result).toBe('test');
	});
});