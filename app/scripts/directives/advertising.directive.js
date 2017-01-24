let $timeout,
    $compile,
	i18nService;

let AdvertisingDirectiveClass = {
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

AdvertisingDirective.$inject = ['$timeout', '$compile', 'i18nService'];

export default function AdvertisingDirective(_$timeout_, _$compile_, _i18nService_) {
    $timeout = _$timeout_;
    $compile = _$compile_;
    i18nService = _i18nService_;

	return AdvertisingDirectiveClass;
};