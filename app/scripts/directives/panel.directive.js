'use strict';

angular.module('app').directive('panel', function () {
	return {
		transclude: true,
		scope: {
			header: '@'
		},
		template:
			'<div class="panel">' +
			'    <div class="panel-header">{{header}}</div>' +
			'    <div ng-transclude class="panel-body"></div>' +
			'<div>'
	};
});