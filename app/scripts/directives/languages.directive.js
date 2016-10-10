'use strict';

angular.module('app').directive('languages', ['i18nService', function (i18nService) {
	var promise;

	return {
		restrict: 'E',
		template: '<select ng-model="selectedLanguage" ng-options="language for language in languages"></select>',
		scope: {
			selectedLanguage: '=?value'
		},
		link: function (scope) {
			i18nService.getLanguages().then(function(value){
				scope.selectedLanguage = i18nService.getLanguage();
				scope.languages = value;
			});

			scope.$watch('selectedLanguage', function(val){
				val && i18nService.setLanguage(val);
			});
		}
	};
}]);