'use strict';

angular.module('app').service('i18nService', ['$http', function ($http) {
	var promise,
		languages = [],
		texts;

	return {
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
			texts = data;
		});
	}
}]);