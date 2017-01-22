'use strict';

var I18nFilter = ['i18nService', function (i18nService) {
	return function (text, language) {
		return i18nService.getText(text, language);
	};
}];

export default I18nFilter;