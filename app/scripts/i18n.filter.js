'use strict';

angular.module('app').filter('i18n', ['i18nService', function (i18nService) {
	var defaultLanguage = 'en';

	return function (text, language) {
		language = language || defaultLanguage;
		return i18nService.getText(language, text);
	};
}]);