'use strict';

var ResultsDirective = {
	templateUrl: '/app/scripts/components/results.html',
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
};

export default ResultsDirective;