'use strict';

angular.module('app').component('results', {
	templateUrl: '/templates/results.html',
	bindings: {
		all: '=',
		done: '=',
		clearFunction: '&'
	},
	controller: function(){
		var ctrl = this;

		this.reset = function(){
			if (ctrl.done){
				ctrl.clearFunction();
			}
		}
	}
});