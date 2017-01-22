'use strict';

import angular from 'angular';

import ResultsDirective from "./components/results.directive";
import AppController from "./controllers/app.controller";
import AdvertisingDirective from "./directives/advertising.directive";
import BigButtonDirective from "./directives/big-button.directive";
import LanguagesDirective from "./directives/languages.directive";
import MagicButtonDirective from "./directives/magic-button.directive";
import PanelDirective from "./directives/panel.directive";
import PanelsDirective from "./directives/panels.directive";
import I18nFilter from "./filters/i18n.filter";
import I18nService from "./services/i18n.service";
import ItemsService from "./services/items.service";

angular.module('app', [])
    .component('results', ResultsDirective)
    .controller('appController', AppController)
    .directive('advertising', AdvertisingDirective)
    .directive('bigButton', BigButtonDirective)
    .directive('languages', LanguagesDirective)
    .directive('magicButton', MagicButtonDirective)
    .directive('panel', PanelDirective)
    .directive('panels', PanelsDirective)
    .filter('i18n', I18nFilter)
    .service('i18nService', I18nService)
    .service('itemsService', ItemsService);