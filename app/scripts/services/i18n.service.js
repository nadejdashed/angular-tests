'use strict';

let $http,
	promise,
	languages = [],
	language,
	texts;

function requestLanguages(){
	promise = $http.get('/translations.json').then((response) => {
		var data = response.data;

		languages.push(...Object.keys(data));
		language = languages[0];
		texts = data;

		return languages;
	});
	return promise;
}

class I18nService {
	constructor(__$http__) {
		$http = __$http__;
		promise = language = texts = undefined;
		languages = [];
	}
	getLanguage () {
		return language;
	}
	setLanguage (lang) {
		if (lang && texts[lang]) {
			language = lang;
		}
	}
	getLanguages () {
		return promise || requestLanguages();
	}
	getText (text, requestedLanguage) {
		var l = requestedLanguage || language;
		return texts && texts[l][text] ? texts[l][text] : '';
	}
}

I18nService.$inject = ['$http'];

export default I18nService;