'use strict';

angular.module('app').component('results', {
	templateUrl: '/scripts/components/results.html',
	bindings: {
		l: '=lang',
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