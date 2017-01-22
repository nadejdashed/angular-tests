'use strict';

var AdvertisingDirective = function ($timeout, $compile, i18nService) {
	return {
		transclude: 'element',
		link: function (scope, element, attr, ctrl, transcludeFn) {
			var html = '<div>{{ "Adv" | i18n : getLang() }}</div>',
				advHtml = $compile(html)(scope);

			element.after(advHtml);
			$timeout(function(){
				advHtml.remove();
				transcludeFn(scope, function(clone){
					element.after(clone);
				});
			}, 2000);

			scope.getLang = i18nService.getLanguage;
		}
	};
};

export default AdvertisingDirective;