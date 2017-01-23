let i18nService,
	promise;

var LanguagesDirectiveObj = {
	restrict: 'E',
	template: '<select ng-model="selectedLanguage" ng-options="language for language in languages"></select>',
	scope: {
		selectedLanguage: '=?value'
	},
	link: (scope) => {
		i18nService.getLanguages().then((value) => {
			scope.selectedLanguage = i18nService.getLanguage();
			scope.languages = value;
		});

		scope.$watch('selectedLanguage', (val) => {
			val && i18nService.setLanguage(val);
		});
	}
};


LanguagesDirective.$inject = ['i18nService'];

export default function LanguagesDirective(__i18nService__) {
	i18nService = __i18nService__;
	return LanguagesDirectiveObj;
}