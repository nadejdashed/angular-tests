'use strict';

angular.module('app').directive('languages', ['i18nService', function (i18nService) {
	var languages = i18nService.getLanguages();

	return {
		restrict: 'E',
		template: '<select ng-model="selectedLanguage" ng-options="language for language in languages"></select>',
		scope: {
			selectedLanguage: '=value'
		},
		link: function (scope) {
			scope.selectedLanguage = scope.selectedLanguage || 'en';
			scope.languages = languages;
		}
	};
}]);