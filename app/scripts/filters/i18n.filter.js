let i18nService;
let I18nFilterFn = (text, language) => i18nService.getText(text, language);

I18nFilter.$inject = ['i18nService'];

export default function I18nFilter(__i18nService__) {
	i18nService = __i18nService__;
	return I18nFilterFn;
}