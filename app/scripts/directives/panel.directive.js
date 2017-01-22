'use strict';

var PanelDirective = function () {
	return {
		transclude: true,
		require: "^panels",
		scope: {
			header: '@'
		},
		template:
		'<div class="panel">' +
		'    <div class="panel-header">{{header}}</div>' +
		'    <div ng-transclude class="panel-body"></div>' +
		'<div>',
		link: function(scope, element, attrs, controller) {
			controller.addPanel();
		},
		controller: function() {
			this.doS = 'a';
		}
	};
};

export default PanelDirective;