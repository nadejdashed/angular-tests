'use strict';

angular.module('mock', ['ngMockE2E']).run(function ($httpBackend, items, translations) {
	var DebugMode = true;

	if (DebugMode) {
		$httpBackend.whenGET('/items').respond(items);
		$httpBackend.whenGET('/translations.json').respond(translations);
		$httpBackend.whenGET(/.html$/).passThrough();
	} else {
		$httpBackend.whenGET(/^.*$/).passThrough();
	}
});

angular.module('app').requires.push('mock');