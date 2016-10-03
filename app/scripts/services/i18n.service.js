'use strict';

angular.module('app').service('i18nService', ['$http', '$rootScope', function ($http, $rootScope) {
	var promise,
		languages = [],
		language,
		texts;

	return {
		getLanguage: function () {
			return language;
		},
		getLanguages: function () {
			promise || requestLanguages();
			return languages;
		},
		getText: function (language, text) {
			return texts && texts[language] && texts[language][text] ? texts[language][text] : '';
		}
	};

	function requestLanguages(){
		promise = $http.get('/translations.json').then(function (response) {
			var data = response.data;

			Array.prototype.push.apply(languages, Object.keys(data));
			language = languages[0];
			texts = data;
		});
	}
}]);