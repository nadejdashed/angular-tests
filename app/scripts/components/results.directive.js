class ResultsDirective {
	constructor (){
		this.template = require('./results.html');
		this.bindings = {
			l: '=lang',
			all: '=',
			done: '=',
			clearFunction: '&'
		};
		this.controller = ResultsDirectiveCtrl;
	}
	static createInstance() {
		ResultsDirective.instance = new ResultsDirective();
		return ResultsDirective.instance;
	}
}

class ResultsDirectiveCtrl {
	reset () {
		if (this.done){
			this.clearFunction();
		}
	}
}

export default ResultsDirective;