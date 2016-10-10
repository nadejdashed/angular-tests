'use strict';

angular.module('app').service('i18nService', ['$http', function ($http) {
	var promise,
		languages = [],
		language,
		texts;

	return {
		getLanguage: function () {
			return language;
		},
		setLanguage: function(lang) {
			if (lang && texts[lang]) {
				language = lang;
			}
		},
		getLanguages: function () {
			return promise || requestLanguages();
		},
		getText: function (text, requestedLanguage) {
			var l = requestedLanguage || language;
			return texts && texts[l][text] ? texts[l][text] : '';
		}
	};

	function requestLanguages(){
		promise = $http.get('/translations.json').then(function (response) {
			var data = response.data;

			Array.prototype.push.apply(languages, Object.keys(data));
			language = languages[0];
			texts = data;

			return languages;
		});
		return promise;
	}
}]);