class ResultsComponent {
	constructor (){
		this.template = require('./results.html');
		this.bindings = {
			l: '=lang',
			all: '=',
			done: '=',
			clearFunction: '&'
		};
		this.controller = ResultsComponentCtrl;
	}
	static createInstance() {
        ResultsComponent.instance = new ResultsComponent();
		return ResultsComponent.instance;
	}
}

class ResultsComponentCtrl {
	reset () {
		if (this.done){
			this.clearFunction();
		}
	}
}

export default ResultsComponent;