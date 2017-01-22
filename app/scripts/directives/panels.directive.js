'use strict';

var PanelsDirective = function () {
	return {
		transclude: true,
		template:
		'<h2>{{"Panel" | i18n:l}}{{count}}</h2>' +
		'<div ng-transclude></div>',
		controller: function($scope) {
			$scope.count = 0;

			this.addPanel = function(){
				$scope.count++;
			}
		}
	};
};

export default PanelsDirective;