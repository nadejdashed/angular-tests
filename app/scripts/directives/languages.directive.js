'use strict';

angular.module('app').directive('languages', ['i18nService', function (i18nService) {
	var promise = i18nService.getLanguages();

	return {
		restrict: 'E',
		template: '<select ng-model="selectedLanguage" ng-options="language for language in languages"></select>',
		scope: {},
		link: function (scope) {
			promise.then(function(value){
				scope.selectedLanguage = i18nService.getLanguage();
				scope.languages = value;
			});

			scope.$watch('language', function(val){
				val && i18nService.setLanguage(val);
			});
		}
	};
}]);