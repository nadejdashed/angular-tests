import "angular";
import "angular-mocks";

import {Items, Translations} from "./data-mocks.module";

angular.module('mock', ['ngMockE2E']).run(function ($httpBackend, items, translations) {
	var DebugMode = true;

	if (DebugMode) {
		$httpBackend.whenGET('/items').respond(items);
		$httpBackend.whenGET('/translations.json').respond(translations);
		$httpBackend.whenGET(/.html$/).passThrough();
	} else {
		$httpBackend.whenGET(/^.*$/).passThrough();
	}
})
	.value('items', Items)
	.value('translations', Translations);

angular.module('app').requires.push('mock');