'use strict';

angular.module('app').service('i18nService', ['$http', function ($http) {
	var languages = [],
		texts;

	$http.get('/translations.json').then(function (response) {
		var data = response.data;

		Array.prototype.push.apply(languages, Object.keys(data));
		texts = data;
	});

	return {
		getLanguages: function () {
			return languages;
		},
		getText: function (language, text) {
			return texts && texts[language] && texts[language][text] ? texts[language][text] : '';
		}
	};
}]);