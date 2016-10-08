'use strict';

angular.module('app').filter('i18n', ['i18nService', function (i18nService) {
	return function (text) {
		return i18nService.getText(text);
	};
}]);