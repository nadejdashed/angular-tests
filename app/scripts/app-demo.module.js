'use strict';

angular.module('appDemo', ['app', 'ngMockE2E', 'mock']).run(function ($httpBackend, items, translations) {
	var DebugMode = true;

	if (DebugMode) {
		$httpBackend.whenGET('/items').respond(items);
		$httpBackend.whenGET('/translations.json').respond(translations);
	} else {
		$httpBackend.whenGET(/^.*$/).passThrough();
	}
});